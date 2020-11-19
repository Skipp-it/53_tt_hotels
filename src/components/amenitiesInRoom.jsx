/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from './common/httpService';
import configDetails from './common/configDetails.json';

export default function AmenitiesInRoom(props) {
  console.log(props);
  const [listAmenities, setListAmenities] = useState([]);

  useEffect(() => {
    let data = {
      headers: configDetails.headers.headers,
      params: configDetails.query.query,
    };

    async function getDetail() {
      const result = await http.get(configDetails.apiEndpoint+props.match.params.id, data);
      let obj = result.data.data.body.amenities[0].listItems[1];
      console.log(result.data.data.body.amenities[0].listItems[1]);

      setListAmenities(obj);
    }

    getDetail();
  }, [listAmenities]);

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Amenities {listAmenities.heading} </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <ul>
                {Object.keys(listAmenities).map((key) => {
                  if (key !== 'heading')
                    return listAmenities[key].map((x) => <li>{x}</li>);
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
