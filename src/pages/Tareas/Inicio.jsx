import React,{useEffect,useRef,useState} from "react";
import { Form, FormGroup, Modal, ModalBody, Input, Label,Button, Card, Row, Col  } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin,{DateClickArg,Draggable} from "@fullcalendar/interaction" 
import esLocale from "@fullcalendar/core/locales/es"
import timeGridPlugin from "@fullcalendar/timegrid"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSave, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

/**Redux */
import { useSelector, useDispatch } from "react-redux";
import {crudActions} from '../../actions/crud.actions'
import { getMes } from '../../helpers/funciones'


const Inicio = () =>{
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.tareas)
    const calendarRef = useRef()
    const [modalView, setmodalView] = useState(false);
    const [modalViews, setmodalViews] = useState(false);
    const [tareaId, settareaId] = useState(0);
    const [fecha, setfecha] = useState('');
    const [titulo, settitulo] = useState('');
    const [detalle, setdetalle] = useState('');



    const getDatas = (xredux,payload) =>{
        const {desde,hasta} = getMes()
        let dato ={
            start: desde,
            end: hasta,
            gstart:desde,
            gend:hasta
        }
        dispatch(crudActions.GET_DATA(xredux,payload,dato))
    }
    const toggleModalView = () => {    
        handleClear()
      };
      /**Modal Views */
    const toggleModalViews = () => {    
        handleClear()
    }; 

    const handleClear = () =>{
        settitulo('')
        setfecha('')
        setdetalle('')
        settareaId(0)
        setmodalView(false)
        setmodalViews(false)
    }  

    useEffect(() => {
        getDatas('TAREAS_DATA','tareas')
        return () => {
        
        }
    }, [])

    const handleClick = (e) =>{
        setmodalView(true)
        setfecha(e.dateStr)
    }
    const submitHandle = event =>{
        event.preventDefault()
        let calendarApi = calendarRef.current.getApi()
        const {start,end} = calendarApi.currentDataManager.data.dateProfile.currentRange 
        let xstart = new Date(start)
        let xend   = new Date(end)
        let iok ={
            start:fecha,
            end:fecha,
            gstart: xstart.getFullYear()+'-'+("0"+(xstart.getMonth()+1)).slice(-2)+'-01',
            gend: xend.getFullYear()+'-'+("0"+(xend.getMonth()+1)).slice(-2)+'-31',
            title:titulo,
            detalle:detalle,
            backgroundColor: "#1fa2f2"
        }
        dispatch(crudActions.SET_ADD('TAREAS_ADD','tareas',iok))
        iok={}
        handleClear()      
    }

    const submitUpdate = event =>{   
        event.preventDefault()     
        let calendarApi = calendarRef.current.getApi()              
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange      
        let xstart = new Date(start)
        let xend = new Date(end)  
        let iok ={
          id: tareaId,     
          title: titulo,
          detalle: detalle,     
          gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
          gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31',
          backgroundColor: "#1cb84a"
        }        
        dispatch(crudActions.SET_UPDATE('TAREAS_ADD','tareas',iok)) 
        iok = {} 
        handleClear()
      }
      const deleteHandle = () =>{    
                        
        let calendarApi = calendarRef.current.getApi()              
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange      
        let xstart = new Date(start)
        let xend = new Date(end) 
        let iok ={
            tareaId: tareaId,              
            gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
            gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31'
          }
        dispatch(crudActions.GET_DELETE('TAREAS_ADD','tareas',iok))   
        iok = {} 
        handleClear()
      }

      const handleNext = () =>{
          let calendarApi = calendarRef.current.getApi()
          calendarApi.next()
          const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange
            let xstart = new Date(start)
            let xend = new Date(end)      
            let dato = {            
                gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
                gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31'
            }   
            dispatch(crudActions.GET_DATA('TAREAS_DATA','tareas',dato))  
      }
      const handlePrev = () =>{
        let calendarApi = calendarRef.current.getApi()
        calendarApi.prev()
        const {start, end } = calendarApi.currentDataManager.data.dateProfile.currentRange
          let xstart = new Date(start)
          let xend = new Date(end)      
          let dato = {            
              gstart : xstart.getFullYear()+'-'+("0" + (xstart.getMonth() + 1)).slice(-2)+'-01',
              gend   : xend.getFullYear()+'-'+("0" + (xend.getMonth() + 1)).slice(-2)+'-31'
          }   
          dispatch(crudActions.GET_DATA('TAREAS_DATA','tareas',dato))  
    }

      

      const handleView = (it) => {         
        settareaId(it.event.id)        
        settitulo(it.event.title)                
        setdetalle(it.event.extendedProps.detalle)       
        setmodalViews(true)     
      }

    return(
        <div className="contenido">
            <div className="main-contenido">
                <Row>
                    <Col md="12">
                        <FullCalendar
                        ref={calendarRef}
                        locales={[esLocale]}
                        locale={'es'}
                        timeZone={'America/La_Paz'}
                        navLinks={true}
                        height={540}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next',
                            center:'title',
                            right:'dayGrows="4" ridMonth, timeGridDay'
                        }}
                        events={data}
                        dateClick={handleClick}
                        eventClick={handleView}
                        customButtons={{
                            prev:{
                                click: function(){
                                    handlePrev()
                                }
                            },
                            next:{
                                click: function(){
                                    handleNext()
                                }
                            }
                        }}
                        
                        />
                    </Col>
                </Row>


                <Modal isOpen={modalView} toggle={toggleModalView} className="deletuBody">
    <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
      <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody className="deletuConte">  
      <Form  onSubmit={submitHandle} className="mb-3">      
        <Row form>
          <Col md={12} className="det">   
            <FormGroup >
              <Label for="titulo">Titulo</Label>
                <Input
                    id="title"
                    name="title"                    
                    type="text"
                    value={titulo}
                    onChange={ (e) => settitulo(e.target.value)}                                 
                />
            </FormGroup>
            <FormGroup>
              <Label for="detalle">Detalle</Label>
                <Input
                    id="detalle"
                    name="detalle"                    
                    type="textarea"
                    value={detalle}                    
                    onChange={ (e) => setdetalle(e.target.value)}                                 
                />
            </FormGroup>
          </Col>
        </Row>  
        <Row>
          <Col md={12} className="det">
            <Button
              type="submit"             
              className={titulo === '' ? "btn-md disabled btn-info mt-2":"btn-md btn-info mt-2"}>              
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>
        </Row> 
        </Form>
      </ModalBody>
  </Modal>
  <Modal isOpen={modalViews} toggle={toggleModalViews} className="deletuBody">
    <Button className="btn-view btn-danger"  onClick={() => toggleModalViews()} >
      <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody className="deletuConte">         
      <Form  onSubmit={submitUpdate} className="mb-3">      
        <Row form>
          <Col md={12} className="det">   
            <FormGroup>
              <Label for="titulo">Titulo</Label>
                <Input
                    id="title"
                    name="title"                    
                    type="text"
                    value={titulo}
                    onChange={ (e) => settitulo(e.target.value)}                                                     
                />
            </FormGroup>
            <FormGroup>
              <Label for="detalle">Detalle</Label>
                <Input
                    id="detalle"
                    name="detalle"                    
                    type="textarea"
                    value={detalle}                    
                    onChange={ (e) => setdetalle(e.target.value)}                                 
                />
            </FormGroup>
          </Col>
        </Row>  
        <Row>
          <Col md={12} className="det">
            <Button
              type="submit"             
              className={titulo === '' ? "btn-md disabled btn-info mt-2":"btn-md btn-info mt-2"}>              
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>
        </Row>         
        </Form>
        <Row>
          <Col md={12} className="det">
            <Button                         
              className={"btn-md btn-danger mt-2"}
              onClick={deleteHandle}
              >              
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Col>
        </Row> 
      </ModalBody>
  </Modal> 
            </div>
        </div>
         
    )


}

export default Inicio