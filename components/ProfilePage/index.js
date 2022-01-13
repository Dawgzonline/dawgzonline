import React, { useState , useRef, useEffect, useMemo} from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

const ProfileInput = ({ title, content , onUpdate, updates, update, updateState, setUpdatesRef}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const updateDone = useRef(updateState.initial);

  const inputClick = () => {
    if (!open) {
      setOpen(true);
      return;
    }
    if (inputValue === "") {
      setOpen(false);
    }
  };

  useEffect(() =>{
      const request = async() => {
          updateDone.current = updateState.partial;
          await onUpdate();
          setUpdatesRef(updates.current.count += 1);
          updateDone.current = updateState.done;
      }
      if(update && updateDone.current !== updateState.partial){
       request(); 
      }
  },[update,onUpdate,updates,updateState,setUpdatesRef])

  return (
    <div
      className={!open ? "profile-input" : "profile-input profile-input-dim"}
    >
      {!open && (
        <div style={{alignSelf : "center"}}>
          <Typography variant="body1" color="myprimary.dark" className="profile-input-title">{title}</Typography>
          {content && <Typography variant="body2" color="myprimary.main">{content}</Typography>}
        </div>
      )}
      {open && (
        <input
          value={inputValue}
          placeholder="Enter text here"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      )}
      <EditIcon className="global-icons" onClick={inputClick} />
    </div>
  );
};

export default function ProfilePage() {
    const updateState = useMemo(() => { return {
        initial : "INITIAL",
        done : "DONE",
        partial : "WORK_IN_PROGRESS"
    }},[]);
    const [update, setUpdate] = useState(false);
    const updatesRef = useRef({state : updateState.initial, count : 0});
    const setUpdatesRef = (count) => {
        updatesRef.current = { state : updateState.partial, count : count};
        if(count === profileItem.length){
            console.log("done update");
            setUpdate(false);
            updatesRef.current = { state : updateState.initial, count : 0};
        }
    }
  const profileItem = [
    {
      title: "First Name",
      onUpdate : () => {},
    },
    {
      title: "Last Name",
      onUpdate : () => {},
    },
    {
      title: "Username",
      onUpdate : () => {},
    },
    {
      title: "Email ID",
      onUpdate : () => {},
    },
    {
      title: "Password",
      onUpdate : () => {},
    },
    {
      title: "Mobile Number",
      onUpdate : () => {},
    },
    {
      title: "Delivery Address 1",
      content:
        "Lorem ajacjlnc ajcancalnkc anclkjnkacnklacs ajkfjcanacnlk ncjankascnk",
      onUpdate : () => {},
    },
    {
      title: "Add Delivery Address 2",
      onUpdate : () => {},
    },
];
  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <Typography variant="h4" color="myprimary.dark" variantMapping={{h4 : "h1"}}>PROFILE</Typography>
        {profileItem.map((item, index) => (
          <ProfileInput
            key={`profile_input_${index}`}
            title={item.title}
            content={item.content}
            onUpdate={item.onUpdate}
            update={update}
            updates={updatesRef}
            updateState={updateState}
            setUpdatesRef={setUpdatesRef}
          />
        ))}

        <button disabled={update} onClick={()=>{setUpdate(true);}}><Typography variant="body1" color="myprimary.dark">UPDATE PROFILE</Typography></button>
      </div>
    </div>
  );
}
