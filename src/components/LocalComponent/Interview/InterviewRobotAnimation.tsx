import React from 'react'
import RobotImageAnimation from "@/../public/LottieFiles/AI-Robot.json"
import Lottie from 'lottie-react'

function InterviewRobotAnimation() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Lottie className='ml-12 w-[80%l h-full' animationData={RobotImageAnimation} loop={true} />
    </div>
  )
}

export default InterviewRobotAnimation
