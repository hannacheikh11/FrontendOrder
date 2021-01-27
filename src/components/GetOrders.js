import React from 'react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


export default class GetOrder extends React.Component {
  state = {
    modalInsertar: false,
    modalEliminar: false,
    orders: [],
    form:{
      cod:'',
      name: "",
      DNI:"",
      address:"",
      email: "",
      total:0,
      tipoModal:''

    }
  }

  componentDidMount() {
    axios.get('/api/v1/orders')
      .then(res => {
        const orders = res.data;
        this.setState({ orders });
      })
  }
  peticionPut=()=>{
    
    axios.put('/api/v1/order/info/'+ this.state.form.cod, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    });
  }


  peticionDelete=()=>{
    axios.delete('/api/v1/orders/'+ this.state.form.cod).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  
peticionGet=()=>{
  axios.get('/api/v1/orders').then(response=>{
    this.setState({data: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  peticionPost=async()=>{
    
   await axios.post('/api/v1/orders',this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  seleccionarOrder=(order)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        cod: order.cod,
        name: order.name,
        DNI: order.DNI,
       address:order.address,
       email:order.email,
       total:order.total
      }
    })
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }
    
      
      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }
  render() {
    const {form}=this.state;
    return (
      <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Order</button>
  <br /><br />
      <table className="table ">
      <thead>
        <tr>
          <th>cod</th>
          <th>name</th>
          <th>DNI</th>
          <th>adress</th>
          <th>email</th>
          <th>total</th>
          <th>status</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {this.state.orders.map(order =>{
          return(
            

          <tr>
          <td> 
          <label>Codigo:{order.cod}</label></td>
         <td> <label>name:{order.name}</label></td>
         <td> <label>DNI:{order.DNI}</label></td>
         <td> <label>address:{order.address}</label></td>
         <td> <label>email:{order.email}</label></td>
         <td> <label>total:{order.total}</label></td>
        ,<td> <label>status:{order.status}</label></td>
        <td> <label>Date:{order.created}</label></td>
     
    
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarOrder(order); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarOrder(order); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>

        
    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">cod</label>
                    <input className="form-control" type="text" name="cod" id="cod"  onChange={this.handleChange} value={form?form.cod:''}/>
                    <br />
                    <label htmlFor="nombre">name</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}/>
                    <br />
                    <label htmlFor="nombre">DNI</label>
                    <input className="form-control" type="text" name="DNI" id="DNI" onChange={this.handleChange} value={form?form.DNI: ''}/>
                    <br />
                    <label htmlFor="capital_bursatil">address</label>
                    <input className="form-control" type="text" name="address" id="address" onChange={this.handleChange} value={form?form.address:''}/>
                    <br />
                    <label htmlFor="capital_bursatil">email</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email:''}/>
                    <br />
                    <label htmlFor="capital_bursatil">total</label>
                    <input className="form-control" type="text" name="total" id="total" onChange={this.handleChange} value={form?form.total:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar tu order {form && form.cod}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}