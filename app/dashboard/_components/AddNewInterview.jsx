"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();
    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition,jobDesc,jobExperience);

        // const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience : "+jobExperience+" , Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 
Give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in valid JSON format. 
Each object must have "question" and "answer" fields. Use double quotes for all keys and values. No explanation, no markdown, just pure JSON.`;


        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp)
        {
        const resp=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId});

        console.log("Inserted ID:",resp)
        if(resp)
        {
            setOpenDailog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
    }
    else{
        console.log("ERROR");
    }
        setLoading(false);
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer
         transition-all border-dashed'
         onClick={()=>setOpenDailog(true)}
         >
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
       
        <DialogContent className="max-w-2xl">
            <DialogHeader >
            <DialogTitle className="text-2xl" >Tell us more about your job interviwing</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                   
                    <h2>Add Details about yout job position/role, Job description and years of experience</h2>

                    <div className='mt-7 my-3'>
                        <label>Job Role/Job Position</label>
                        <Input placeholder="Ex. Full Stack Developer" required
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>
                    <div className=' my-3'>
                        <label>Job Description/ Tech Stack (In Short)</label>
                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" 
                        required
                        onChange={(event)=>setJobDesc(event.target.value)} />
                    </div>
                    <div className=' my-3'>
                        <label>Years of experience</label>
                        <Input placeholder="Ex.5"  type="number"  max="100" 
                        required
                        onChange={(event)=>setJobExperience(event.target.value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading} >
                        {loading? 
                        <>
                        <LoaderCircle className='animate-spin' /> Generating from AI
                        </>:'Start Interview'    
                    }
                        </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview

// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { LoaderCircle } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobExperience, setJobExperience] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [jsonResponse, setJsonResponse] = useState([]);
//   const router = useRouter();
//   const { user } = useUser();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const prompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 
// Give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in valid JSON format. 
// Each object should have "question" and "answer" fields. No explanation, no markdown, just pure JSON.`;

//     try {
//       const result = await chatSession.sendMessage(prompt);
//       const rawText = result.response.text();

//       const cleanedText = rawText
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//       let parsedJson;
//       try {
//         parsedJson = JSON.parse(cleanedText);
//         setJsonResponse(parsedJson);
//       } catch (error) {
//         console.error("Failed to parse JSON:", error);
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("/api/interview", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jsonMockResp: parsedJson,
//           jobPosition,
//           jobDesc,
//           jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setOpenDialog(false);
//         router.push(`/dashboard/interview/${data.data[0]?.mockId}`);
//       } else {
//         console.error("Insert failed:", data.error);
//       }
//     } catch (err) {
//       console.error("Error during submission:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed"
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className="text-lg text-center">+ Add New</h2>
//       </div>

//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">
//               Tell us more about your job interviewing
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <p>
//                     Add details about your job position/role, job description
//                     and years of experience
//                   </p>

//                   <div className="mt-7 my-3">
//                     <label>Job Role/Job Position</label>
//                     <Input
//                       placeholder="Ex. Full Stack Developer"
//                       required
//                       value={jobPosition}
//                       onChange={(e) => setJobPosition(e.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Job Description / Tech Stack</label>
//                     <Textarea
//                       placeholder="Ex. React, Angular, NodeJs, MySQL"
//                       required
//                       value={jobDesc}
//                       onChange={(e) => setJobDesc(e.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years of Experience</label>
//                     <Input
//                       placeholder="Ex. 5"
//                       type="number"
//                       max="100"
//                       required
//                       value={jobExperience}
//                       onChange={(e) => setJobExperience(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-5 justify-end">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setOpenDialog(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <LoaderCircle className="animate-spin" /> Generating
//                         from AI
//                       </>
//                     ) : (
//                       "Start Interview"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;
