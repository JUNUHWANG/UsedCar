import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export const Result = () => {
      const [Carinfos, setCarinfos] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      /* @bp.route('/result', methods=['POST']) */
      async function saveData() {
            try {
                  setLoading(true);

                  const response = await axios.post('/carinfo/result', {
                        car_num: Carinfos.carinfo.car_num,
                        car_buy_price: Number(Carinfos.carinfo.car_buy_price),
                        car_company: Carinfos.carinfo.car_company, 
                        car_name: Carinfos.carinfo.car_name,
                        car_year: Number(Carinfos.carinfo.car_year),
                        car_buytime: Carinfos.carinfo.car_buytime,
                        car_km: Carinfos.carinfo.car_km,
                        car_fuel: Carinfos.carinfo.car_fuel,
                        car_gear: Carinfos.carinfo.car_gear,
                        car_size: Carinfos.carinfo.car_size,
                        car_sellarea: Carinfos.carinfo.car_sellarea,
                        car_cc: Number(Carinfos.carinfo.car_cc),
                        car_color: Carinfos.carinfo.car_color,
                        car_tax_count: Number(Carinfos.carinfo.car_tax_count),
                        car_seize_count: Number(Carinfos.carinfo.car_seize_count),
                        car_security_count: Number(Carinfos.carinfo.car_security_count),
                        car_accident_count: Number(Carinfos.carinfo.car_accident_count),
                        car_flood_count: Number(Carinfos.carinfo.car_flood_count),
                        car_change_using_count: Number(Carinfos.carinfo.car_change_using_count),
                        car_change_owner_count: Number(Carinfos.carinfo.car_change_owner_count),
                        car_broken: Number(Carinfos.carinfo.car_broken),
                        car_option_sunloop: Number(Carinfos.carinfo.car_option_sunloop),
                        car_option_wheel: Number(Carinfos.carinfo.car_option_wheel),
                        car_option_navi: Number(Carinfos.carinfo.car_option_navi),
                        car_option_light: Number(Carinfos.carinfo.car_option_light),
                        car_option_parkingsensor: Number(Carinfos.carinfo.car_option_parkingsensor),
                        car_option_leatherseat: Number(Carinfos.carinfo.car_option_leatherseat),
                        car_option_hotseat: Number(Carinfos.carinfo.car_option_hotseat),
                        car_option_airbag: Number(Carinfos.carinfo.car_option_airbag),
                        car_option_highpass: Number(Carinfos.carinfo.car_option_highpass),
                        car_option_wiper: Number(Carinfos.carinfo.car_option_wiper),
                        car_option_smartkey: Number(Carinfos.carinfo.car_option_smartkey),
                        car_option_autoside: Number(Carinfos.carinfo.car_option_autoside),
                        car_option_coolseat: Number(Carinfos.carinfo.car_option_coolseat),
                        car_option_tpms: Number(Carinfos.carinfo.car_option_tpms),
                        car_option_bluetooth: Number(Carinfos.carinfo.car_option_bluetooth),
                        car_option_hothandle: Number(Carinfos.carinfo.car_option_hothandle),
                        car_option_aeb: Number(Carinfos.carinfo.car_option_aeb),
                        car_option_ldsw: Number(Carinfos.carinfo.car_option_ldsw),
                        car_option_cruise: Number(Carinfos.carinfo.car_option_cruise),
                        car_option_autotrunk: Number(Carinfos.carinfo.car_option_autotrunk),
                        car_sell_price: Number(Carinfos.carinfo.car_sell_price)
                  }, {
                        withCredentials: true
                  } );
                  console.log(response);

            } catch (error) {
                  console.error(error);
            }
            setLoading(false);
            pageMove();
      }
      //???????????? ????????? ????????? ????????? ??????
      const pageMove = ({history}) => {

            history.push('/');
     
        }

        const onSubmit = (event) => {
            event.preventDefault();
            console.log(Carinfos)
            saveData();

      }


      const getData = async () => {
            try {

                  setError(null);
                  setCarinfos(null);

                  setLoading(true);
                  const res = await axios.get('/carinfo/result')
                  .then(res => {
                        setCarinfos(res.data);
                        console.log(res.data)
                        console.log(Carinfos)
                  })
                  
             } catch (e) {
                  setError(e);
            }
            setLoading(false);
      };

      useEffect(() => {
            getData();
      }, []);



      if (loading) return <div>?????????..</div>;
      if (error) return <div>????????? ??????????????????</div>;

      if (!Carinfos) return null;

      return (
		<>
                  <div><h5>?????? ????????????</h5>
                        <p>{Carinfos.carinfo.carinfono} </p>
                        <h3>{Carinfos.carinfo.car_num}??? ??????</h3>
                        <p>{Carinfos.min}?????? ~ {Carinfos.max}????????? ?????? ??????!</p>
                        <p>?????????:{Carinfos.carinfo.car_company}</p>
                        <p>??????:{Carinfos.carinfo.car_name}</p>
                        <p>??????:{Carinfos.carinfo.car_year}</p>
                        <p>??????:{Carinfos.carinfo.car_fuel}</p>
                        <p>?????????:{Carinfos.carinfo.car_gear}</p>
                        <p>????????????:{Carinfos.carinfo.car_km}km</p>
                        <p>??????:{Carinfos.carinfo.car_color}</p>
                        <p>?????? ?????? ??????:{Carinfos.carinfo.car_sellarea}</p>
                  <div>
                        
                        <button onClick={onSubmit}>????????????</button>
                        
                        <button onClick={saveData}>????????????2</button>
                        
                        <button>????????????</button>
                  </div>
                  </div>



            </>
      );
}

export default Result;