import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [error, setError] = useState(null);

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        // Check if meeting code is not empty
        if (!meetingCode.trim()) {
            setError("Meeting code cannot be empty.");
            return;
        }

        try {
            // Try to add to history and navigate to the meeting
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (err) {
            // Handle error gracefully
            setError("Failed to join the meeting. Please check the meeting code or try again.");
            console.error(err); // Log the error for debugging
        }
    }

    return (
        <>
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Apna Video Call</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/auth");
                    }}>
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Quality Video Call Just Like Quality Education</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>
                            <TextField 
                                onChange={e => setMeetingCode(e.target.value)} 
                                id="outlined-basic" 
                                label="Meeting Code" 
                                variant="outlined" 
                                error={!!error} 
                                helperText={error} // Show error message if any
                            />
                            <Button onClick={handleJoinVideoCall} variant='contained'>
                                Join
                            </Button>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
                    </div>
                </div>
                <div className='rightPanel'>
                    <img src='/logo3.png' alt="Logo" /> {/* Ensure the image path is correct */}
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
