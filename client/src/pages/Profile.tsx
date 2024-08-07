import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateStart,updateFailure,updateSuccess } from '../redux/user/UserSlice';

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({
    email: currentUser?.email,
    username: currentUser?.username,
    profileImg: currentUser?.profileImg
  })
  const [image, setImage] = useState<File | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
        console.log(error.message);
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profileImg: downloadURL })
        })
      }
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpdate = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser?._id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });

      const data = await res.json()
      if(data.success === false){
        // dispatch failure
        dispatch(updateFailure({
          success:data.success,
          message:"Unable to update"
        }))
        return;
      }
      
      // dispatch success data to redux to update the state
      dispatch(updateSuccess(data.user))
    } catch (error) {
      // dispatch failure
      console.log(error);
      
    }
    
  }

  return (
    <main className='w-full flex items-center justify-center min-h-[80vh]'>
      <section className='p-5 w-1/2 h-fit shadow-lg'>
        <div className='border-b-[1px] pb-3'>
          <h2 className='text-3xl font-bold uppercase'>
            Your
            <span className='text-blue-400'>Profile</span>
          </h2>
        </div>
        <div className='my-8'>
          <form onSubmit={handleUpdate} className='grid grid-cols-2 gap-x-8 gap-y-4 w-[85%] mx-auto' action="">
            <div className='col-span-2'>
              <input onChange={handleImageChange} ref={fileRef} accept='image/*' type="file" hidden name="" id="" />
              <img onClick={() => fileRef.current?.click()} className='size-32 object-cover rounded-full mx-auto' src={formData?.profileImg} alt="" />
              <p className='w-full flex justify-center my-4 '>
                {imageError ? (
                  <span className='text-red-500 font-medium'>{"Error uploading image (file size < 2Mb), Please try again"}</span>
                ) : (
                  <span className='text-green-400 font-medium'>{imagePercent ? imagePercent + '%' + " uploaded" : null}</span>
                )}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email">E-Mail:</label>
              <input className='outline-none border-[1px] border-solid border-black p-1' type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} name="email" id="email" />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="username">Username:</label>
              <input className='outline-none border-[1px] border-solid border-black p-1' type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} name="username" id="username" />
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              <button type='submit'  className='shadow-lg p-2 rounded-lg text-white hover:bg-blue-500 duration-200 px-4 flex justify-center items-center bg-blue-400'>
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
