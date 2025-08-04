import React, { useState } from "react";
import { BookingProvider } from "./BookingContext";
import ProgressIndicator from "./components/ProgressIndicator";
import StepWrapper from "./components/StepWrapper";
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

  const renderStep = () => {
    const stepProps = {
      isTransitioning,
      onNext: step < 6 ? next : undefined,
      onBack: step > 1 ? back : undefined,
    };

    switch (step) {
      case 1:
        return (
          <StepWrapper
            {...stepProps}
            nextLabel="Next"
            showBack={false}
            validationKey="tour"
            validationMessage="Please select a tour"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Step 1: Choose your tour
            </h3>
            <StepTourSelection />
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper
            {...stepProps}
            nextLabel="Next"
            validationKey="participants"
            validationMessage="Please choose the number of participants"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Step 2: Number of participants
            </h3>
            <StepParticipants />
          </StepWrapper>
        );
      case 3:
        return (
          <StepWrapper
            {...stepProps}
            nextLabel="Next"
            validationKey="tourType"
            validationMessage="Please choose a tour type"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Step 3: Choose your tour type
            </h3>
            <StepTourType />
          </StepWrapper>
        );
      case 4:
        return (
          <StepWrapper
            {...stepProps}
            nextLabel="Next"
            validationKey="dateTime"
            validationMessage="Please choose a date and time"
          >

            <StepCalendarRegular active={true} />
            <StepDateTimePrivate active={true} />
          </StepWrapper>
        );
      case 5:
        return (
          <StepWrapper
            {...stepProps}
            nextLabel="Next"
            validationKey="contact"
            validationMessage="Please fill in your name and email"
          >
            <StepContact />
          </StepWrapper>
        );
      case 6:
        return (
          <StepWrapper {...stepProps} showBack={false}>
            <StepSummary onEditDetails={() => setStep(5)} />
          </StepWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
        Book your tour
      </h2>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Let's organize your visit step by step
      </p>

      <ProgressIndicator currentStep={step} />

      <div className="min-h-[400px] mt-8">{renderStep()}</div>
    </div>
  );
};

const BookingWizard: React.FC = () => {
  return (
    <BookingProvider>
      <Wizard />
    </BookingProvider>
  );
};

export default BookingWizard;


