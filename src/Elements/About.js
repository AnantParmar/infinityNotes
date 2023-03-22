import React from 'react'

export default function About(props) {
    
    let myStyle = {
      color: "white",
      backgroundColor: "black"
    }
    
  return (
    <>
    <div className='container border border-info border-3 rounded-3 p-3' style={myStyle}>
    <h2 className='my-3'>About Site</h2>
    <div className="accordion" id="accordionExample" >
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
        <strong>Add Your Note</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Infinity Notes gives You Facility To Write Your Note, Read Your Note, Delete Your Note Also Update Your Note With Great UI Experience.
      </div>
    </div>
  </div>
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
        <strong>Free to use</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Infinity Notes is a free Site To Store Your Notes with Google FireBase Security System.
      </div>
    </div>
  </div>
  <div className="accordion-item" style={myStyle}>
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyle}>
        <strong>Browser Compatible</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        This Site works in any web browser such as Chrome, firefox, Internet Exploler, Safari, Opera. The New Version Of Site Is Comming Soon... 
      </div>
    </div>
  </div>
</div>
</div>
  
    </>
  )
}

