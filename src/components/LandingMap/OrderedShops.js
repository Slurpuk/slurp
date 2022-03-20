// import React, {useContext, useEffect, useState} from 'react';
// import {GlobalContext} from "../../../App";
//
// const [shopsData, setShopsData] = useState([]);
//
// export default function OrderedShops() {
//
//     const context = useContext(GlobalContext)
//     //setShopsData(context.shopsData);
//
//     useEffect(() => {
//         const temp = context.shopsData;
//         setShopsData(temp);
//     }, [context.shopsData]);
//
//     useEffect(() => {
//         const editedShopsData = shopsData.map(item => {
//             return {
//                 Name: item.Name,
//                 Intro: item.Intro,
//                 Location: {
//                     latitude: item.Location._latitude,
//                     longitude: item.Location._longitude,
//                 },
//                 Image: item.Image,
//                 Email: item.Email,
//                 IsOpen: item.isOpen,
//                 ItemsOffered: item.ItemsOffered,
//                 Likeness: item.Likeness,
//                 Queue: item.Queue,
//                 DistanceTo: calculateDistance(item.Location),
//             };
//         });
//
//         //ordering the shops based on distance from user location
//         editedShopsData
//             .sort((a, b) => a.DistanceTo - b.DistanceTo);
//
//         //filtering the shops based on radius limitation (rn 20,000m)
//         const newEdited = editedShopsData
//             .filter((item)=> item.DistanceTo < 20000);
//
//         context.setOrderedShops(newEdited);
//
//     });
//
//
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         const calculateDistance = coords => {
//             //TODO change defaultLocation for currentLocation (currentLatitude and currentLongitude)
//
//             const R = 6371e3; // metres
//             const latitude1 = (context.currentCenterLocation.latitude * Math.PI) / 180; // φ, λ in radians
//             const latitude2 = (coords.latitude * Math.PI) / 180;
//             const diffLat =
//                 ((coords.latitude - context.currentCenterLocation.latitude) * Math.PI) / 180;
//             const diffLon =
//                 ((coords.longitude - context.currentCenterLocation.longitude) * Math.PI) / 180;
//
//             const aa =
//                 Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
//                 Math.cos(latitude1) *
//                 Math.cos(latitude2) *
//                 Math.sin(diffLon / 2) *
//                 Math.sin(diffLon / 2);
//             const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
//
//              // in metres
//             return parseInt(R * cc);
//         };
//
//     };
