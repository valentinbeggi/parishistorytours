import React, { useState } from "react";
import { BookingProvider } from "./BookingContext";
import StepTourSelection from "./steps/StepTourSelection";
import StepParticipants from "./steps/StepParticipants";
import StepTourType from "./steps/StepTourType";
import StepCalendarRegular from "./steps/StepCalendarRegular";
import StepDateTimePrivate from "./steps/StepDateTimePrivate";
import StepContact from "./steps/StepContact";
import StepSummary from "./steps/StepSummary";

const Wizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const back = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => Math.max(1, s - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const goTo = (i: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(i);
      setIsTransitioning(false);
    }, 300);
  };

  // Progress indicator component
  const ProgressIndicator = () => {
    const steps = [
      { number: 1, label: "Tour" },
      { number: 2, label: "Participants" },
      { number: 3, label: "Type" },
      { number: 4, label: "Date & Time" },
      { number: 5, label: "Contact" },
      { number: 6, label: "Summary" }
    ];

    return (
      <div className="mt-8">
        <div className="flex items-center justify-center">
          {steps.map((stepItem, index) => (
            <React.Fragment key={stepItem.number}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    step >= stepItem.number
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepItem.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${
                  step >= stepItem.number ? "text-gray-800" : "text-gray-500"
                }`}>
                  {stepItem.label}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-12 mx-2 transition-colors duration-200 ${
                    step > stepItem.number ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Step wrapper with transitions
  const StepWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        isTransitioning 
          ? 'opacity-0 transform translate-x-4' 
          : 'opacity-100 transform translate-x-0'
      }`}
    >
      {children}
    </div>
  );

  return (
    <BookingProvider>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          Book your tour
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Let's organize your visit step by step
        </p>

        {step === 1 && <StepTourSelection next={next} />}
        {step === 2 && <StepParticipants next={next} back={back} />}
        {step === 3 && <StepTourType next={next} back={back} />}
        {step === 4 && (
          <>
            <StepCalendarRegular next={next} back={back} active />
            <StepDateTimePrivate next={next} back={back} active />
          </>
        )}
        {step === 5 && <StepContact next={next} back={back} />}
        {step === 6 && <StepSummary back={back} onRestart={() => goTo(1)} />}

        <ProgressIndicator />
      </div>
    </BookingProvider>
  );
};

export default Wizard;
              <StepDateTimePrivate next={next} back={back} active />
            </StepWrapper>
          )}
          {step === 5 && (
            <StepWrapper>
              <StepContact next={next} back={back} />
            </StepWrapper>
          )}
          {step === 6 && (
            <StepWrapper>
              <StepSummary back={() => goTo(1)} />
            </StepWrapper>
          )}
        </div>

        <ProgressIndicator />
      </div>
    </BookingProvider>
  );
};

export default Wizard;
