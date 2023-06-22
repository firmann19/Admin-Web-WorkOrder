import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import LogoWO from "../../assets/images/data-gathering.png";
import Open from "../../assets/images/open.png";
import Progress from "../../assets/images/progress.png";
import Close from "../../assets/images/close.png";
import "./cardDashboard.css";
import { useState } from "react";
import { useEffect } from "react";

function CardDashboard() {
  const [getCountWO, setgetCountWO] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { getCountWO } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setgetCountWO(getCountWO);
    };
    fetchData();
  }, []);


  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-success rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div>
                <h3 className="text-white">{getCountWO}</h3>

                <p className="text-white">Work Order</p>
              </div>
              <img src={LogoWO} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <a href="#" class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div>
                <h3 className="text-white">150</h3>

                <p className="text-white">Open</p>
              </div>
              <img src={Open} className="icon-wo"/>
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <a href="#" class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-danger rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div>
                <h3 className="text-white">150</h3>

                <p className="text-white">Progress</p>
              </div>
              <img src={Progress} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <a href="#" class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-secondary rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div>
                <h3 className="text-white">150</h3>

                <p className="text-white">Close</p>
              </div>
              <img src={Close} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <a href="#" class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
