import {nfts} from '../components/MyNFTs';
import { useState } from "react";
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import swal from 'sweetalert';

export default function upload({ caver, account, newKip17addr }) {
  const [fileUrl, updateFileUrl]=useState(``);
  const [category, setCategory]=useState("");
  const [image, setImage]=useState(null);
  const [name, setName]=useState("");
  const [desc, setDesc]=useState("");
  const [to, setTo]=useState("");
  const [date, setDate]=useState("");

  const check = () => {
    if (fileUrl && category && name && desc && to && date){
      return true;
    }
    return false;
  }

  const onChange = async (e) => {
    const file=e.target.files[0];

    setImage(window.URL.createObjectURL(file));
   
    const storage=new ThirdwebStorage();
    const ipfs=await storage.upload(file);
    console.log(storage.resolveScheme(ipfs));
    
    const url=storage.resolveScheme(ipfs);
    updateFileUrl(url);
  }

  const onChange2 = async () => {
    const selected=document.getElementById('category');
    const selected_id=selected.options[selected.selectedIndex].value;

    setCategory(selected_id);
  }

   
  
  const createNFT = async () =>{
    const tokenContract=await new caver.klay.Contract(nfts.abi, newKip17addr,{
      from : account,
    });
    tokenContract.options.address=newKip17addr;
    
  
    if (check()){
      const token=await tokenContract.methods.mint(to,category,fileUrl,name,desc,date)
      .send({
        from:account, gas:'200000000',
      }, (error)=>{
        if (error) throw error;
      })
      setTo("");
      updateFileUrl("");
      setImage("");
      setName("");
      setDesc("");
      setDate("");
      setCategory(3);
    }
    else {
      swal("필수 항목을 모두 입력하세요.", " ","warning");
    }
  };

  

  return (
    <article>
      <div>
        <h1>Upload</h1>
        <p><span className="require" >* </span> required</p>
        

        <form className="main">
        
          <div className="upload_div">
            <label>Image <span className="require">*</span></label>
            <div className="file">
              <label for="fileInput">
                {image? (
                <>
                  <img for="fileInput" src={image} alt="preview" /> 
                  <button 
                    onClick={()=> { setImage(""); updateFileUrl("")}}
                  />
                </>
                ) : <p>No image</p>
                }
              </label>
              <input type="file" name="file" id="fileInput" onChange={onChange}  /> 
            </div>    
          </div>

          <div className="upload_div">
            <label>name <span className="require">*</span></label>
            <div>
              <input
                className="form-input"
                type="text" 
                placeholder="Award name"
                onChange={(e)=>{setName(e.target.value);}}
                required
                value={name}
              />
            </div>
          </div>

          <div className='upload_div'>
            <label>details<span className="require"> *</span></label>
            <div>
              <textarea 
                className='form-input'
                rows="1"
                placeholder="Award details"
                onChange={(e)=>{setDesc(e.target.value);}}
                required
                value={desc}
              />
            </div>
          </div>
   
          <div className='upload_div'>
            <label>Category<span className="require"> *</span></label>
            <div>
              <select 
                id="category"
                onChange={onChange2}
                required
              >
                  <option value="3">선택하세요</option>
                  <option value="0">교내상장</option>
                  <option value="1">교외상장</option>
              </select>
            </div>
          </div>

          <div className='upload_div'>
            <label>date<span className="require"> *</span></label>
            <div>
              <input 
                className="form-input"
                type="text" 
                placeholder="ex) 2023-01-01"
                onChange={(e)=>{setDate(e.target.value);}}
                required
                value={date}
              />
            </div>
          </div>

          <div className="upload_div">
            <label>recipient<span className="require"> *</span></label>
            <div>
              <input 
                  className='form-input'
                  type="text" 
                  placeholder="recipient's addr"
                  onChange={(e)=>{setTo(e.target.value);}}
                  value={to}
                  required
              ></input>
            </div> 
          </div>
        </form>
          
      
        <button className="sub" onClick={createNFT}> create NFT </button>
      
      </div>
        
      <style jsx>{`
        
        h1 {
          color :#0c135e;
          font-size:30px;
          font-weight : bold;
        }
        p {
          margin-bottom:40px;
        }
        label {
          color :#0c135e;
          font-size:25px;
          font-weight : bold;
          margin-bottom: 5px;
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
        .require {
          font-weight:bold;
          color: crimson;
        }
        .sub {
          background-color:transparent;
          color:#525ffb;
          border: 1px solid #525ffb;
          padding: 10px 30px;
          border-radius:40px;
          cursor:pointer;
          margin-top:20px;
        }
        .upload_div {
          margin-bottom:20px
        }
        
        .file label {
          display: flex; 
          width: 350px;
          height: 350px;
          align-items: center;
          justify-content: center;
          padding: 1em 1em;
          color: #999; 
          font-size: inherit; 
          line-height: normal; 
          vertical-align: middle; 
          background-color: #fdfdfd;
          cursor: pointer; 
          border: 1px solid #ebebeb;
          border-bottom-color: #e2e2e2; border-radius: .25em;
          border-radius: 12px;
        } 
        .file label:hover{
          background-color: #e2e2e2;
        }
        .file img {
          display:flex;
          width:350px;
          height:350px;
          padding:0.5em 0.5em;
          border-radius:12px;
        }
        .file input {
          overflow: hidden; 
        }
      
      `}</style>
    
    </article>
  );
}
