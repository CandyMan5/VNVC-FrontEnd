import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../fonts/fontawesome-free-5.15.3-web/css/all.min.css';
import '../assets/stylesheets/dangkythanhvien.css'
import '../assets/stylesheets/base.css'
import '../assets/stylesheets/nhapthongtinvx.css'
import axios from 'axios';

const DangKyThanhVien = () => {
    
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [date_of_birth, setDateOfBirth] = useState('')
    const [cccd, setCCCD] = useState('')
    const [customer_id, setCustomerId] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [commune, setCommune] = useState('')

    const SystemLoyalCustomerRegistor = (event) =>{
        try {
            axios({
                url: `http://vnvc.somee.com/api/loyalcustomer/insertcustomer`,
                method: 'post',
                data:
                {
                    name: name,
                    gender: gender,
                    phone: phone,
                    date_of_birth: date_of_birth,
                    cccd: cccd,
                    customer_id: customer_id,
                    email: email,
                    address: address,
                    city: city,
                    district: district,
                    commune: commune
                }
            },
            { withCredentials: true }
            )
            .then(res => {
                alert(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err)
            );
        } catch (error) {
            console.log('Failed', error)
        }
        event.preventDefault();
    } 

    return (
        <div>
            <div className="main_content">
                <div className="row">
                    <div className="title">
                        <h1 className="text-center">
                            <span>????ng k?? th??nh vi??n</span>
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12 center-column">
                            <div className="form">
                                <div className="col-sm-8 col-sm-offset-2 col-xs-12">
                                    <form className="form_register" onSubmit={SystemLoyalCustomerRegistor}>
                                        <div className="indexing">
                                            <h3>Th??ng tin c?? nh??n</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-firstname">H??? v?? T??n</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                            name="firstname" 
                                                            placeholder="H??? v?? t??n" 
                                                            id="input-firstname" 
                                                            className="form-control"
                                                            value={name}
                                                            onChange={(e)=> setName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-gender">Gi???i t??nh</label>
                                                    <div className="col-xs-12">
                                                        <select id="gender" name="gender" className="form-control" value={gender} onChange={(e)=> setGender(e.target.value)}>
                                                            <option value="Nam">Nam</option>
                                                            <option value="N???">N???</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-numberphone">S??? ??i???n tho???i</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                            name="numberphone" 
                                                            placeholder="S??? ??i???n tho???i" 
                                                            id="input-numberphone" 
                                                            className="form-control"
                                                            value={phone}
                                                            onChange={(e)=> setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-birth">Ng??y sinh</label>
                                                    <div className="col-xs-12">
                                                        <input type="date" name="birth" id="input-birth" className="form-control" value={date_of_birth}
                                                            onChange={(e)=> setDateOfBirth(e.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-cccd">CMND/CCCD</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                            name="cccd" 
                                                            placeholder="CMND/CCCD" 
                                                            id="input-cccd" 
                                                            className="form-control"
                                                            value={cccd}
                                                            onChange={(e)=> setCCCD(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-customerId">M?? kh??ch h??ng(N???u c??)</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                            name="customerId" 
                                                            placeholder="M?? kh??ch h??ng" 
                                                            id="input-customerId" 
                                                            className="form-control"
                                                            value={customer_id}
                                                            onChange={(e)=> setCustomerId(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-email">Email</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                            name="email" 
                                                            placeholder="Email" 
                                                            id="input-email" 
                                                            className="form-control"
                                                            value={email}
                                                            onChange={(e)=> setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-address">S??? nh?? - T??n ???????ng</label>
                                                    <div className="col-xs-12">
                                                        <input type="text" 
                                                        name="address" 
                                                        placeholder="?????a ch???" 
                                                        id="input-address" 
                                                        className="form-control"
                                                        value={address}
                                                        onChange={(e)=> setAddress(e.target.value)}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-city">Th??nh ph???/ T???nh</label>
                                                    <div className="col-xs-12">
                                                        <select name="city" id="input-city" className="form-control" value={city} onChange={(e)=> setCity(e.target.value)}>
                                                            <option value>--- Ch???n ---</option>
                                                            <option value="Th??? ???? H?? N???i">Th??? ???? H?? N???i</option>
                                                            <option value="Th??nh ph??? H??? Ch?? Minh">Th??nh ph??? H??? Ch?? Minh</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-address">Qu???n/ Huy???n</label>
                                                    <div className="col-xs-12">
                                                        <select name="zone" id="input-zone" className="form-control" value={district} onChange={(e)=> setDistrict(e.target.value)}>
                                                            <option value>--- Ch???n ---</option>
                                                            <option value="Qu???n 1">Qu???n 1</option>
                                                            <option value="Qu???n 2">Qu???n 2</option>
                                                            <option value="Qu???n 3">Qu???n 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="row required">
                                                    <label className="col-xs-12 control-label" for="input-city">Ph?????ng/ X??</label>
                                                    <div className="col-xs-12">
                                                        <select name="ward" id="input-ward" className="form-control" value={commune} onChange={(e)=> setCommune(e.target.value)}>
                                                            <option value>--- Ch???n ---</option>
                                                            <option value="C??t L??i">C??t L??i</option>
                                                            <option value="An Ph??">An Ph??</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4><b>L??u ??:</b> C??c m???c d???u sao kh??ng ???????c b??? tr???ng & ph???i ??i???n ?????y ?????, ch??nh x??c</h4>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="title">
                        <div className="buttons_">
                            <div className="text-center">
                                <button type="submit" id="click_register" className="button_register"
                                    onClick={(e) => {
                                        SystemLoyalCustomerRegistor()}} >
                                            ????ng k??
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKyThanhVien;