import axios from 'axios'
import { useState } from 'react'


export default function Setting({account}){
  const [username, setUsername] = useState("");
  
  const submitData = async (e = React.SyntheticEvent) => {
    e.preventDefault();

    axios.post('/api/profileTable',{
            username:username,
            useraddr:account
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err.res)
          })
    swal("변경되었습니다.", " ","success");
    setUsername("");
  }

 

  return (
    <article>
      <h1>프로필 이름 변경</h1>
      
      <br/>
      <br/>

      <form onSubmit={submitData}>
        <label className="form-label">사용자 이름 / User Name<span className="require"> *</span></label>
        <input 
          type="text" 
          className="form-input"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        ></input>
        <button type="submit">변경하기</button>
      </form>

    
    <style jsx>{`
      h1{
        font-size:30px;
      }
      .form-label{
        margin-bottom:0.5rem;
      }
      .form-input {
        display: block;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        margin-top:10px;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      
      }
      button {
        font-family: inherit;
        padding: 13px 40px;
        background-color: transparent;
        outline: none;
        border: none;
        background: #525FFB;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.05em;
        line-height: 20px;
        text-align: left;
        color: #fff;
        border-radius: 40px;
        cursor: pointer;
        margin-top: 30px;
      }
    `}</style>
    </article>
  )
}


