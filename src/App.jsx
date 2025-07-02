// import './App.css'
import { useState } from "react";
import Header from "./components/Header";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, error } = useFetch(
    "https://job-posting-app-topaz.vercel.app/jobs"
  );

  const filteredJobs = searchValue.trim()
    ? data?.jobs?.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchValue.toLowerCase())
      )
    : data?.jobs;

  const handleDelete = async (id) => {
    await fetch(`https://job-posting-app-topaz.vercel.app/jobs/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <>
      <Header />
      <main className="container my-3">
        <form action="">
          {/* <input type="text" placeholder="Search By Job Title" /> */}
          <div className="input-group mb-3 w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search By Job Title..."
              aria-label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>
        <h1>All Jobs</h1>
        {loading && <p>Loading....</p>}
        {error && <p>Error....</p>}

        <div className="row">
          {filteredJobs?.length > 0 && 
            filteredJobs.map((item) => (
              <div
                className="col-12 col-sm-4 col-md-3 gx-3 gy-2"
                key={item._id}
              >
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.jobTitle}</h5>
                    <p className="card-text">
                      <strong>Company Name: </strong> {item.companyName}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p className="card-text">
                      <strong>Job Type:</strong> {item.jobType}
                    </p>
                    <div className="mt-auto d-flex gap-2">
                      <Link
                        to={`/jobdetails/${item._id}`}
                        className="btn btn-primary w-50"
                      >
                        See Details
                      </Link>
                      <button
                        className="btn btn-danger w-50"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </>
  );
}

export default App;
