import Header from "../components/Header";
import { useState } from "react";
const PostJob = () => {
   const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    qualifications: "",
  });
  setTimeout(() => setSuccessMessage(false), 5000);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "qualifications") {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     qualifications: value.split(/[.,]/).filter((q) => q.length > 0),
    //   }));
    // } else {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://job-posting-app-topaz.vercel.app/jobs",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw "Failed to add job.";
      }
      const data = await response.json();
      setSuccessMessage(true)
    } catch (error) {
      throw error
    }
  };

  return (
    <>
      <Header />
      <main className="container my-4">
        <h2 className="mb-4">Post a Job</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="jobTitle" className="form-label fw-semibold">
              Job Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="companyName" className="form-label fw-semibold">
              Company Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="location" className="form-label fw-semibold">
              Location:
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="salary" className="form-label fw-semibold">
              Salary:
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="jobType" className="form-label fw-semibold">
              Job Type:
            </label>
            <select
              className="form-select"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-time (On-site)">Full-time (On-site)</option>
              <option value="Part-time (On-site)">Part-time (On-site)</option>
              <option value="Full-time (Remote)">Full-time (Remote)</option>
              <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="jobDescription" className="form-label fw-semibold">
              Job Description:
            </label>
            <textarea
              className="form-control"
              id="jobDescription"
              rows="3"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="col-12">
            <label htmlFor="qualifications" className="form-label fw-semibold">
              Qualifications:
            </label>
            <textarea
              className="form-control"
              id="qualifications"
              rows="3"
              name="qualifications"
              value={formData.qualifications}
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Post Job
            </button>
          </div>
        </form>
        {successMessage && <p className="mt-3">Job Added Successfully.</p>}
      </main>
    </>
  );
};

export default PostJob;
