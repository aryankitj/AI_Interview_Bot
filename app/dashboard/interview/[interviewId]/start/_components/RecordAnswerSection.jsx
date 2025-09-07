// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic, StopCircle } from 'lucide-react'
// import { toast } from 'sonner'
// import { chatSession } from '@/utils/GeminiAIModal'
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment'

// function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
//     const [userAnswer,setUserAnswer]=useState('');
//     const {user}=useUser();
//     const [loading,setLoading]=useState(false);
//     const {
//         error,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//         setResults
   
//       } = useSpeechToText({
//         continuous:false,
//         useLegacyResults: false
//       });

//       useEffect(()=>{
       
//         results?.map((result)=>(
//             setUserAnswer(prevAns=>prevAns+result?.transcript)
//         ))
      
//       },[results])

//       useEffect(()=>{
//         if(!isRecording&&userAnswer?.length>10)
//         {
//           UpdateUserAnswer();
//         } 
//       },[userAnswer])
         
//       const StartStopRecording=async()=>{
//         if(isRecording)
//         {
//           stopSpeechToText()
//         }
//         else{
//           startSpeechToText();
//         }
//       }

//       const UpdateUserAnswer=async()=>{

//         console.log(userAnswer)
//         setLoading(true)
//         const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
//         ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
//         " please give us rating for answer and feedback as area of improvmenet if any "+
//         "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

//         const result=await chatSession.sendMessage(feedbackPrompt);
//         const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
//         const JsonFeedbackResp=JSON.parse(mockJsonResp);
//         const resp=await db.insert(UserAnswer)
//         .values({
//           mockIdRef:interviewData?.mockId,
//           question:mockInterviewQuestion[activeQuestionIndex]?.question,
//           correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
//           userAns:userAnswer,
//           feedback:JsonFeedbackResp?.feedback,
//           rating:JsonFeedbackResp?.rating,
//           userEmail:user?.primaryEmailAddress?.emailAddress,
//           createdAt:moment().format('DD-MM-yyyy')
//         })

//         if(resp)
//         {
//           toast('User Answer recorded successfully');
//           setUserAnswer('');
//           setResults([]);
//         }
//         setResults([]);
        
//           setLoading(false);
//       }


//   return (
//     <div className='flex items-center justify-center flex-col'>
//         <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
//             <Image src={'/webcam.png'} width={200} height={200} 
//             className='absolute'/>
//             <Webcam
//             mirrored={true}
//             style={{
//                 height:500,
//                 width:500,
//                 zIndex:10,
//             }}
//             />
//         </div>
//         <Button 
//       //  disabled={loading}
//         variant="outline" className="my-10"
//         onClick={isRecording?stopSpeechToText:startSpeechToText}
//         >
        
//             {isRecording?
//             <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
//                 <Mic/>'Stop Recording'
//             </h2>
//             :
            
//             <h2 className='text-primary flex gap-2 items-center'>
              
//               Record Answer</h2> }</Button>
      
     
//     </div>
//   )
// }

// export default RecordAnswerSection




// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic, StopCircle } from 'lucide-react'
// import { toast } from 'sonner'
// import { chatSession } from '@/utils/GeminiAIModal'
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment'

// function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
//     const [userAnswer,setUserAnswer]=useState('');
//     const {user}=useUser();
//     const [loading,setLoading]=useState(false);
//     const {
//         error,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//         setResults
   
//       } = useSpeechToText({
//         continuous:true,
//         useLegacyResults: false
//       });

//       useEffect(()=>{
       
//         results?.map((result)=>(
//             setUserAnswer(prevAns=>prevAns+result?.transcript)
//         ))
      
//       },[results])

//       useEffect(()=>{
//         if(!isRecording&&userAnswer?.length>10)
//         {
//           UpdateUserAnswer();
//         } 
//       },[userAnswer])
         
//       const StartStopRecording=async()=>{
//         if(isRecording)
//         {
//           stopSpeechToText()
//         }
//         else{
//           startSpeechToText();
//         }
//       }

//       const UpdateUserAnswer=async()=>{

//         console.log(userAnswer)
//         setLoading(true)
//         const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
//         ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
//         " please give us rating for answer and feedback as area of improvmenet if any "+
//         "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

//         const result=await chatSession.sendMessage(feedbackPrompt);
//         const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
//         const JsonFeedbackResp=JSON.parse(mockJsonResp);
//         const resp=await db.insert(UserAnswer)
//         .values({
//           mockIdRef:interviewData?.mockId,
//           question:mockInterviewQuestion[activeQuestionIndex]?.question,
//           correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
//           userAns:userAnswer,
//           feedback:JsonFeedbackResp?.feedback,
//           rating:JsonFeedbackResp?.rating,
//           userEmail:user?.primaryEmailAddress?.emailAddress,
//           createdAt:moment().format('DD-MM-yyyy')
//         })

//         if(resp)
//         {
//           toast('User Answer recorded successfully');
//           setUserAnswer('');
//           setResults([]);
//         }
//         setResults([]);
        
//           setLoading(false);
//       }


//   return (
//     <div className='flex items-center justify-center flex-col'>
//         <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
//             <Image src={'/webcam.png'} width={200} height={200} 
//             className='absolute'/>
//             <Webcam
//             mirrored={true}
//             style={{
//                 height:500,
//                 width:500,
//                 zIndex:10,
//             }}
//             />
//         </div>
//         <Button 
//         disabled={loading}
//         variant="outline" className="my-10"
//         onClick={StartStopRecording}
//         >
//             {isRecording?
//             <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
//                 <StopCircle/>Stop Recording
//             </h2>
//             :
            
//             <h2 className='text-primary flex gap-2 items-center'>
//               <Mic/>  Record Answer</h2> }</Button>
      
     
//     </div>
//   )
// }

// export default RecordAnswerSection


// "use client";
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text'
// import { Mic, StopCircle } from 'lucide-react'
// import { toast } from 'sonner'
// import { chatSession } from '@/utils/GeminiAIModal'
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment'

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);

//   const {
//     error,
//     results,
//     isRecording,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });
  

//   // 🔹 Handle error from speech recognition
//   useEffect(() => {
//     if (error) {
//       console.error("Speech recognition error:", error);
//       toast.error("Mic error: " + error.message);
//     }
//   }, [error]);

//   // 🔹 Update transcript when results change
//   useEffect(() => {
//     if (results.length > 0) {
//       const transcript = results.map(r => r.transcript).join(" ");
//       console.log("Transcript:", transcript);
//       setUserAnswer(transcript);
//     }
//   }, [results]);

//   // 🔹 Auto save answer when recording stops
//   useEffect(() => {
//     if (!isRecording && userAnswer?.length > 10) {
//       UpdateUserAnswer();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isRecording]);

//   const StartStopRecording = () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     try {
//       console.log("Final Answer:", userAnswer);
//       setLoading(true);

//       const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
//       User Answer: ${userAnswer}. 
//       Based on the question and user answer, give a rating (1-10) and feedback (3-5 lines, improvements).
//       Respond ONLY in JSON format with fields: { "rating": number, "feedback": string }`;

//       const result = await chatSession.sendMessage(feedbackPrompt);

//       // Clean response
//       const mockJsonResp = (await result.response.text())
//         .replace('```json', '')
//         .replace('```', '');
//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       const resp = await db.insert(UserAnswer).values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback,
//         rating: JsonFeedbackResp?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD-MM-yyyy'),
//       });

//       if (resp) {
//         toast.success('User Answer recorded successfully ✅');
//         setUserAnswer('');
//         setResults([]);
//       }
//     } catch (err) {
//       console.error("UpdateUserAnswer error:", err);
//       toast.error("Failed to process answer ❌");
//     } finally {
//       setLoading(false);
//       setResults([]);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
//         <Image src={'/webcam.png'} width={200} height={200} className="absolute" alt="Webcam overlay" />
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 500,
//             width: 500,
//             zIndex: 10,
//           }}
//         />
//       </div>

//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-10"
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
//             <StopCircle /> Stop Recording
//           </h2>
//         ) : (
//           <h2 className="text-primary flex gap-2 items-center">
//             <Mic /> Record Answer
//           </h2>
//         )}
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;


"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  // 🔹 Handle mic/speech recognition error
  useEffect(() => {
    if (error) {
      let msg = "";
      if (typeof error === "string") {
        msg = error;
      } else if (typeof error === "object" && error.message) {
        msg = error.message;
      } else {
        msg = JSON.stringify(error);
      }

      console.error("Speech recognition error:", msg);
      toast.error("Mic error: " + msg);
    }
  }, [error]);

  // 🔹 Update transcript when results change
  useEffect(() => {
    if (results.length > 0) {
      const transcript = results.map(r => r.transcript).join(" ");
      console.log("Transcript:", transcript);
      setUserAnswer(transcript);
    }
  }, [results]);

  // 🔹 Auto save answer when recording stops
  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      console.log("Final Answer:", userAnswer);
      setLoading(true);

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
      User Answer: ${userAnswer}. 
      Based on the question and user answer, give a rating (1-10) and feedback (3-5 lines, improvements).
      Respond ONLY in JSON format with fields: { "rating": number, "feedback": string }`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      // Clean response
      const mockJsonResp = (await result.response.text())
        .replace('```json', '')
        .replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      });

      if (resp) {
        toast.success('User Answer recorded successfully ✅');
        setUserAnswer('');
        setResults([]);
      }
    } catch (err) {
      console.error("UpdateUserAnswer error:", err);
      toast.error("Failed to process answer ❌");
    } finally {
      setLoading(false);
      setResults([]);
    }
  };

  return (
    <div className="flex items-center justif-center flex-col">
    <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image src={'/webcam.png'} width={200} height={200} className="absolute" alt="Webcam overlay" />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;

