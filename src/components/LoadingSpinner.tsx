import React from 'react';
import { motion } from 'motion/react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-primary rounded-full"
            animate={{
              y: [-10, 0, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {message}
      </motion.p>
    </div>
  );
}

export function ProgressiveLoader({ steps, currentStep }: { steps: string[], currentStep: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <motion.div
        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="space-y-2 text-center">
        <motion.h3
          className="text-lg"
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {steps[currentStep]}
        </motion.h3>
        
        <div className="flex space-x-2 justify-center">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStep ? [0.8, 1.2, 0.8] : 0.8,
                backgroundColor: index <= currentStep ? '#030213' : '#ececf0'
              }}
              transition={{ 
                duration: index === currentStep ? 1 : 0.3,
                repeat: index === currentStep ? Infinity : 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}