import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { app } from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'


const Profile = () => {
  const {currentUser} = useSelector((state:RootState) => state.user);
  const [editEmail,setEditEmail] = useState(currentUser?.email)
  const [editUsername,setEditUsername] = useState(currentUser?.username)
  const [imagePercent,setImagePercent] = useState(0)
  const [imageError,setImageError] = useState(false)
  const [formData,setFormData] = useState({})
  // const [editProfilePic,setEditProfilePic] = useState(currentUser?.profileImg)
  const [image,setImage] = useState(null)
  console.log(imagePercent);
  
  console.log(formData);
  
  const fileRef = useRef()  as React.MutableRefObject<HTMLInputElement>
  console.log(image);
  useEffect(() => {
    if(image) {
      handleFileUpload(image)
    }
  },[image])

  const handleFileUpload = async (image) => {
    // console.log(image);
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef,image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...FormData,profileImg:downloadURL})
        })
      }
    )
  }
  return (
    <main className='w-full flex items-center justify-center min-h-[80vh]'>
      <section className='p-5 w-1/2 h-[65vh] shadow-lg'>
        <div className='border-b-[1px] pb-3'>
          <h2 className='text-3xl font-bold uppercase'>
            Your
            <span className='text-blue-400'>Profile</span>
          </h2>
        </div>
        <div className='my-8'>
          <form className='grid grid-cols-2 gap-x-8 gap-y-4 w-[85%] mx-auto' action="">
            <div className='col-span-2'>
              <input onChange={(e) => setImage(e.target.files[0])} ref={fileRef} accept='image/*' type="file" hidden name="" id="" />
              <img  onClick={() => fileRef.current.click()} className='size-32 object-cover rounded-full mx-auto' src={currentUser?.profileImg} alt="" />
              <p className='w-full flex justify-center my-4 '>
                {imageError ? (
                  <span className='text-red-500 font-medium'>{"Error uploading image (file size < 2Mb), Please try again"}</span>
                ) : (
                  <span className='text-green-400 font-medium'>{imagePercent ? imagePercent+'%'+" uploaded" : null}</span>
                )}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="editMail">E-Mail:</label>
              <input className='outline-none border-[1px] border-solid border-black p-1' type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} name="email" id="editMail" />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="editMail">Username:</label>
              <input className='outline-none border-[1px] border-solid border-black p-1' type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} name="email" id="editMail" />
            </div>
            {/* <div className='flex flex-col'>
              <label htmlFor="editMail">Profile Pic:</label>
              <input type="file"  id="editMail" />
            </div> */}
            {/* email */}
          {/* username */}
          {/* profile pic upload */}
          <div className='col-span-2 flex flex-col gap-2'>
            <button className='shadow-lg p-2 rounded-lg text-white hover:bg-blue-500 duration-200 px-4 flex justify-center items-center bg-blue-400'>
              Update
            </button>
            <div className='flex gap-4 justify-between'>
              <button className=' capitalize font-medium text-red-500'>
                delete Account
              </button>
              <button className=' capitalize font-medium text-red-500'>
                Signout
              </button>
            </div>
          </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Profile