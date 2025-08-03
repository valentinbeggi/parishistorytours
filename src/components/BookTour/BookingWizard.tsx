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

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));
  const goTo = (i: number) => setStep(i);

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
        {step === 6 && <StepSummary back={() => goTo(1)} />}
      </div>
    </BookingProvider>
  );
};

export default Wizard;
