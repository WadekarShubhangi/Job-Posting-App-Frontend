import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";

const JobDetails = () => {
  const { data } = useFetch("https://job-posting-app-topaz.vercel.app/jobs");
  const jobId = useParams();
  const selectedJob = data?.jobs?.find((item) => item._id == jobId.jobId);
  return (
    <>
      <Header />
      <main className="container my-3">
        <h2 className="mb-3">{selectedJob?.jobTitle}</h2>
        <div className="card p-3">
          <p className="card-text">
            <strong>Company Name: </strong> {selectedJob?.companyName}
          </p>
          <p className="card-text">
            <strong>Location: </strong> {selectedJob?.location}
          </p>
          <p className="card-text">
            <strong>Salary: </strong> {selectedJob?.salary}
          </p>
          <p className="card-text">
            <strong>Job Type:</strong> {selectedJob?.jobType}
          </p>
          <p className="card-text">
            <strong>Description: </strong> {selectedJob?.jobDescription}
          </p>
          <p className="mb-0"><strong>Qualifications: </strong></p>
          <ol>
            {selectedJob?.qualifications?.split(/[.,]/).filter((q)=> q.length > 0).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
};

export default JobDetails;
