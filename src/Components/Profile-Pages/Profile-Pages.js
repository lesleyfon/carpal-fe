import React, { useState, useEffect } from "react";
import UpdateProfile from "./UpdateProfile";
import "./Profile-Pages.scss";

import { connect } from "react-redux";

import {
    SetUserAction,
    EditProfileAction
} from "../../Redux/Actions/UserAction";

//TODO - Test Use Effect with Seed Data
//TODO - Setup input for image, and coordinate with BE for storage via S3 bucket
//TODO - Create Loading Spinner Component

function ProfilePage(props) {
    const { errors, touched } = props;
    const [user, setUser] = useState({
        // first_name: "",
        // last_name: "",
        // phone_number: "",
        // email: "",
        // is_driver: false,
        // hobbies: [],
        // audio_love: [],
        // audio_hate: []
    });

    // useEffect(() => {
    //     if (isLoggedIn && !user) {
    //         console.log("use effect works");
    //         axios
    //             .get(`${userEndpoint}`)
    //             .then(res => {
    //                 setUser([...user, user]);
    //                 setLoad(true);
    //             })
    //             .catch(err => {
    //                 setError(err.message);
    //                 setLoad(true);
    //             });
    //     }
    // }, [user]);

    useEffect(() => {
        if (!props.user.first_name) {
            props.SetUserAction();
        }
        setUser({
            ...user,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            phone_number: props.user.phone_number,
            email: props.user.email,
            isDriver: props.user.isDriver,
            hobbies: props.user.hobbies,
            audio_love: props.user.audio_love,
            audio_hate: props.user.audio_hate
        });
        console.log(user)
    }, [props.user]);

    function onEditProfileSubmit(e) {
        e.preventDefault();
        props.EditProfileAction();
    }

    return (
        <div className="contanier">
            {/* if isEditing is set to true, form displays */}
            {props.isEditing ? (
                <UpdateProfile />
            ) : (
                // if isEditing is false, display profile page
                <div className="container">
                    {user.phone_number ? (
                        // on profile page, if user already has a phone number (stand in for profile),
                        <>
                            <div className="profileHeader">
                                <div className="headerImage">
                                    <img
                                        className="profilePic"
                                        src="https://pbs.twimg.com/profile_images/1232869769013014535/iwN5kET4_400x400.jpg"
                                        alt="img1"
                                    ></img>
                                    <a
                                        className="overlaybutton"
                                        href="#"
                                        alt="Profile"
                                    >
                                        Upload Image
                                    </a>
                                </div>
                                <div className="headerDetails">
                                    <h3 role="header name" className="bold">
                                        {user.first_name}
                                        {user.last_name}
                                    </h3>
                                    <h3>{user.email}</h3>
                                    <h3>{user.phone_number}</h3>
                                </div>
                            </div>
                            <div className="bar"></div>
                            <div className="profileDetails">
                                {user.isDriver ? (
                                    <h2>You are a Driver</h2>
                                ) : (
                                    <h2>You are a Rider</h2>
                                )}
                                <div className="profileSection">
                                    <h2>Hobbies</h2>
                                    <div className="flexContainer">
                                        {user.hobbies && user.hobbies.map(hobby => (
                                            <div className="bubble" key={hobby}>
                                                {hobby}
                                            </div>
                                        ))}
                                    </div>

                                    <h2>Audio I Love</h2>
                                    <div className="flexContainer">
                                        {user.audio_love && user.audio_love.map(audioLove => (
                                            <div
                                                className="bubble"
                                                key={audioLove}
                                            >
                                                {audioLove}
                                            </div>
                                        ))}
                                    </div>

                                    <h2>Audio I Hate</h2>
                                    <div className="flexContainer">
                                        {user.audio_hate && user.audio_hate.map(audioHate => (
                                            <div
                                                className="bubble"
                                                key={audioHate}
                                            >
                                                {audioHate}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Mapbox will go here */}
                                <div className="buttonContainer">
                                    <button
                                        className="edit"
                                        onClick={onEditProfileSubmit}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // on profile page, if user doesn't have phone number (stand in for profile), redirect to form?
                        <UpdateProfile />
                    )}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    error: state.user.error,
    isEditing: state.user.isEditing
});

export default connect(mapStateToProps, { SetUserAction, EditProfileAction })(
    ProfilePage
);