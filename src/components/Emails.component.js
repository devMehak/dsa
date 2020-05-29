import React from "react"
const Emails= (props) => {
  return (
    props.emails.map((val, idx) => {
      let emailName = `emailName-${idx}`
      return (
        <tr key={val.index}>
          <td>
            <input type="text"  name="email" data-id={idx} id={emailName} className="form-control " />
          </td>
          <td>
            {
            idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
            }
          </td>
        </tr >
      )
    })
  )
}
export default Emails