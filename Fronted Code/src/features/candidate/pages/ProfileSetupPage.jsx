
import { useState } from "react";

import Step1 from "../components/profile-steps/Step1";
import Step2 from "../components/profile-steps/Step2";
import Step3 from "../components/profile-steps/Step3";
import Step4 from "../components/profile-steps/Step4";
import Step5 from "../components/profile-steps/Step5";

import { saveCandidateProfile } from "../services/candidateService";

const initialProfileData = {
  roleId: "",
  roleName: "",
  photo: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  linkedin: "",
  portfolio: "",
  headline: "",
  bio: "",
  availability: "",
  workPref: "",
  yearsExp: "",
  salaryMin: "",
  salaryMax: "",
  skills: [],
  experience: [],
  education: [],
  languages: [],
  resumeMode: "upload",
  resumeFile: "",
  resumeUploaded: false,
  coverLetter: "",
  projectLinks: [],
};

const ProfileSetupPage = () => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialProfileData);
  const [published, setPublished] = useState(false);

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = steps[currentStep - 1];

  const handleNext = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };


const handlePublish = async () => {
  setSaving(true);
  setMessage("");

  try {
    const response = await saveCandidateProfile(data);

    setPublished(true);
    setMessage(
      response.message || "Candidate profile saved successfully."
    );
  } catch (error) {
    setMessage(error.message || "Unable to save candidate profile.");
  } finally {
    setSaving(false);
  }
};


  return (
    <main className="profile-setup">
      {!published && (
        <header className="profile-setup__header">
          <p className="profile-setup__eyebrow">HHS · CANDIDATE</p>
          <h1>Complete Your Profile</h1>
          <p>
            Tell us about yourself so companies can discover your profile.
          </p>
        </header>
      )}

      {!published && (
        <div className="profile-setup__progress">
          <div className="profile-setup__progress-label">
            <span>Profile Setup</span>
            <span>Step {currentStep} of {steps.length}</span>
          </div>

          <div
            className="profile-setup__progress-track"
            role="progressbar"
            aria-label="Profile setup progress"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={currentStep}
          >
            <div
              className="profile-setup__progress-fill"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {message && (
  <p role="status" aria-live="polite">
    {message}
  </p>
)}

      <section className="profile-setup__content">
        <CurrentStep
          data={data}
          setData={setData}
          onNext={handleNext}
          onBack={handleBack}
          onPublish={handlePublish}
          published={published}
           saving={saving}
        />
      </section>

      {!published && (
        <nav className="profile-setup__navigation" aria-label="Step navigation">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {currentStep < steps.length && (
            <button type="button" onClick={handleNext}>
              Continue
            </button>
          )}
        </nav>
      )}
    </main>
  );
};

export default ProfileSetupPage;
