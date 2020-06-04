import React, { Fragment, useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { connect } from "react-redux";
import { getPendingLeads } from "../../actions/lead";
import { getMapData } from "../../actions/map";
import Spinner from "../layout/Spinner";

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 28.4089,
  lng: 77.3178,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({
  getPendingLeads,
  getMapData,
  map: { mapData },
  lead: { leads, loading },
}) => {
  var origin = null;

  useEffect(() => {
    getPendingLeads();
  }, [getPendingLeads]);

  const [selectedMark, setSelectedMark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function success(position) {
    const destination = [];
    origin = `${position.coords.latitude},${position.coords.longitude}`;
    leads.map((lead) =>
      destination.push(`${lead.latLng[0].lat}, ${lead.latLng[0].lng}`)
    );
    getMapData(origin, destination);
  }

  function NearestLead() {
    return (
      <button
        className="nearest-lead"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(success, () => null, {
            maximumAge: 10000,
            timeout: 5000,
            enableHighAccuracy: true,
          });
          //mapData.map((element) => console.log(element));
        }}
      >
        Nearest Lead
      </button>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Locate />
      <NearestLead />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        {leads.map((lead) => (
          <Marker
            key={lead._id}
            position={{
              lat: lead.latLng[0].lat,
              lng: lead.latLng[0].lng,
            }}
            onClick={() => {
              setSelectedMark(lead);
            }}
          />
        ))}

        {selectedMark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedMark(null);
            }}
            position={{
              lat: selectedMark.latLng[0].lat,
              lng: selectedMark.latLng[0].lng,
            }}
          >
            <div>
              <h2>{selectedMark.clientName}</h2>
              <p>{selectedMark.clientAddress}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Fragment>
  );
};

function Locate() {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
          },
          () => null,
          { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

const mapStateToProps = (state) => ({
  lead: state.lead,
  map: state.map,
});

export default connect(mapStateToProps, { getPendingLeads, getMapData })(Map);
