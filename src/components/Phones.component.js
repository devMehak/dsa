import React from "react"
const Phones= (props) => {
  return (
    props.phones.map((val, idx) => {
      let phoneName = `phoneName-${idx}`
      return (
        <tr key={val.index}>
          <td>
            <input type="text"  name="phone" data-id={idx} id={phoneName} className="form-control " />
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
export default Phones
