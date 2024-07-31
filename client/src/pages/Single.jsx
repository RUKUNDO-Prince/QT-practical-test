import React from "react";
import { deleteIcon, edit } from "../assets/img";
import { Link } from "react-router-dom";
import { Menu } from "../components";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="info">
            <span>Prince</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={edit} alt="Edit-Icon" />
            </Link>
            <img src={deleteIcon} alt="Delete-Icon" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
          consectetur adipisicing elitLorem ipsum dolor sit amet consectetur
          adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing
          elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
          dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet
        </p>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
