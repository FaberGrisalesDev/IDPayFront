import React, {SetStateAction, useState, useEffect} from "react";
import {Button, Col, Form, Modal, Row, Table, Container, FormLabel, Spinner} from "react-bootstrap";
import {AlertComponent} from "../../../../alerts/AlertFailAuth";
import {trans, Trans} from "../../../../hook/Internationalization";
import PropTypes from 'prop-types';
import {CreditCardController} from "../../../../controller/CreditCardController";
import {useAuth} from "../../../../hook/AuthContext";
import {CatalogoController} from "../../../../controller/CatalogoController";
import {ModalLoading} from "./ModalLoading";
import { Formik, Form as Formulario } from 'formik';


export const ModalRolUser = ({show, setShow,}: any) => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');

    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState<string>('')
    const [firstSurname, setFirstSurname] = useState<string>('');
    const [secondSurname, setSecondSurname] = useState<string>('');
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [numberDocument, setNumberDocument] = useState<string>('');
    const [dateBirth, setDateBirth] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [tipoPersona, setTipoPersona] = useState<string>('');
    const [tipoSolicitud, setTipoSolicitud] = useState<string>('');
    const [codZonaDirr, setCodZonaDirr] = useState<string>('');
    const [direction, setDirection] = useState<string>('');
    const [civilStatus, setcivilStatus] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [celular, setCelular] = useState<string>('');
    const [nameCorto, setNameCorto] = useState<string>('');
    const [codCiudadDirCorr, setCodCiudadDirCorr] = useState<string>('');
    const [cupoAsignado, setCupoAsignado] = useState<string>('');
    const [indicativo, setIndicativo] = useState<string>('');
    const [numeroSolicitud, setNumeroSolicitud] = useState<string>('');
    const [sucursal, setSucursal] = useState<string>('');
    const [bin, setBin] = useState<string>('');
    const [fechaSolicitud, setFechaSolicitud] = useState<string>('');
    const [actividadEconomica, setActividadEconomica] = useState<string>('');
    const [codGrupoManejo, setCodGrupoManejo] = useState<string>('');
    const [cicloFacturacion, setCicloFacturacion] = useState<string>('');
    const [tipoTarjeta, setTipoTarjeta] = useState<string>('');
    const [codigoVendedor, setCodigoVendedor] = useState<string>('');
    const [tipoExtracto, setTipoExtracto] = useState<string>('');
    const [codAfinidad, setCodAfinidad] = useState<string>('');

    const [selectTipoId, setSelectTipoId] = useState([]);
    const [selectSexo, setSelectSexo] = useState([]);
    const [selectCivil, setSelectCivil] = useState([]);
    const [selectTipoPersona, setSelectTipoPersona] = useState([]);
    const [selectTipoSolicitud, setSelectTipoSolicitud] = useState([]);
    const [selectCodZonaDirr, setSelectCodZonaDirr] = useState([]);
    const [selectGrupoManejo, setSelectGrupoManejo] = useState([]);
    const [selectCicloFacturacion, setSelectCicloFacturacion] = useState([]);
    const [selectTipoTarjeta, setSelectTipoTarjeta] = useState([]);
    const [selectTipoExtracto, setSelectTipoExtracto] = useState([]);
    const [selectCodigoAfinidad, setSelectCodigoAfinidad] = useState([]);
    const [selectCodigoVendedor, setSelectCodigoVendedor] = useState([]);

    const [token, setToken] = useState<string>('');
    const [loanding, setLoanding] = useState<boolean>(false);
    const auth = useAuth();

    useEffect(() => {
        (async () => {
            if (auth.user != null) {
                setToken(auth.user.token);

                const dataSexo = await CatalogoController.findAllSex({
                    token: auth.user.token,
                })
                setSelectSexo(dataSexo);

                const dataId = await CatalogoController.findAllTypeId({
                    token: auth.user.token,
                })
                setSelectTipoId(dataId);

                const dataCivil = await CatalogoController.findAllCivil({
                    token: auth.user.token,
                })
                setSelectCivil(dataCivil);

                const dataTipoPersona = await CatalogoController.findAllTipoPersona({
                    token: auth.user.token,
                })
                setSelectTipoPersona(dataTipoPersona);

                const dataTipoSolicitud = await CatalogoController.findAllTipoSolicitud({
                    token: auth.user.token,
                })
                setSelectTipoSolicitud(dataTipoSolicitud);

                const dataCodZonaDirr = await CatalogoController.findAllCodZonaDirr({
                    token: auth.user.token,
                })
                setSelectCodZonaDirr(dataCodZonaDirr);



                const dataCicloFacturacion = await CatalogoController.findAllCicloFacturacion({
                    token: auth.user.token,
                })
                setSelectCicloFacturacion(dataCicloFacturacion);
                const dataTipoTarjeta = await CatalogoController.findAllTipoTarjeta({
                    token: auth.user.token,
                })
                setSelectTipoTarjeta(dataTipoTarjeta);

                const dataTipoExtracto = await CatalogoController.findAllTipoExtracto({
                    token: auth.user.token,
                })
                setSelectTipoExtracto(dataTipoExtracto);
                const dataTipoCodAfinidad = await CatalogoController.findAllCodAfinidad({
                    token: auth.user.token,
                })
                setSelectCodigoAfinidad(dataTipoCodAfinidad);
                const dataTipoCodVendedor = await CatalogoController.findAllCodVendedor({
                    token: auth.user.token,
                })
                setSelectCodigoVendedor(dataTipoCodVendedor);

                const dataGrupoManejo = await CatalogoController.findAllGrupoManejo({
                    token: auth.user.token,
                })
                setSelectGrupoManejo(dataGrupoManejo);

            }
        })()
    }, [])

    const renderShowAlert = () => {
        if (showAlert) {
            return <AlertComponent
                title={titulo}
                message={mensaje}
                variant={tipoAlerta}
                setShow={setShowAlert}
            />
        }
    }


    const handleOnSubmit = async (valores: any) => {
        setLoanding(true);
        try {
            const response = await CreditCardController.create({
                "actividadEconomica": valores.actividadEconomica,
                "celular1": valores.celular,
                "codCiudadDirCorr": valores.codCiudadDirCorr,
                "correoElectronico": valores.correoElectronico,
                "cupoAsignado": valores.cupoAsignado,
                "direccionCorrespondenciadCampo1": valores.direccionCorrespondencia,
                "estadoCivil": valores.estadoCivil,
                "fechaNacimiento": valores.fechaNacimiento,
                "fechaSolicitud": "20220122",
                "indicativo": valores.indicativo,
                "noIdentificacion": valores.noIdentificacion,
                "nombreCorto": valores.nombreCorto,
                "nombreRealce": valores.primerApellido + " " + valores.primerNombre,
                "numeroSolicitud": valores.numeroSolicitud,
                "primerApellido": valores.primerApellido,
                "primerNombre": valores.primerNombre,
                "sexo": valores.sexo,
                "sucursal": valores.sucursal,
                "tipoDeIdentificacion": valores.tipoDeIdentificacion,
                "tipoDePersona": valores.tipoDePersona,
                "codZonaPDirCorr": valores.codZonaPDirCorr,
                "codAfinidad": valores.codAfinidad,
                "tipoSolicitud": valores.tipoSolicitud,
                "tipoTarjeta": valores.tipoTarjeta,
                "codGrupoManejo": valores.codGrupoManejo,
                "codigoVendedor": valores.codigoVendedor ,
                "cicloFacturacion": valores.cicloFacturacion,
                "tipoExtracto": valores.tipoExtracto,
                "bin": valores.bin,
                token: token
            })

            if (response) {
                setShowAlert(true);
                setTitulo(trans('usuarioCreado'));
                setMensaje(trans('creadoExitosamente'));
                setTipoAlerta("success");
                setTimeout(() => setShowAlert(false), 6000);
                // setShow(false)
            } else {
                setShowAlert(true);
                setTitulo(trans('usuarioNoCreado'));
                setMensaje(trans('intenteNuevamente'));
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 4000)
                return;
            }


        } catch (error) {
            setShowAlert(true);
            setTitulo(trans('error'));
            setMensaje(trans('Error'));
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 3000)
        } finally {
            setLoanding(false);
        }
    }

    const handleClose = () => {
        setFirstName('');
        setFirstSurname('');
        setSecondSurname('');
        setNameCorto('');
        setTypeDocument('');
        setNumberDocument('');
        setcivilStatus('');
        setDateBirth('');
        setSex('');
        setDirection('');
        setEmail('');
        setCodCiudadDirCorr('');
        setCelular('');
        setSucursal('');
        setIndicativo('');
        setActividadEconomica('');
        setNumeroSolicitud('');
        setTipoPersona('');
        setCodZonaDirr('');
        setTipoSolicitud('');
        setCupoAsignado('');
        setBin('');
        setTipoExtracto('');
        setTipoTarjeta('');
        setCodAfinidad('');
        setCodGrupoManejo('');
        setCodigoVendedor('');
        setCicloFacturacion('');

        setShow(false)
    };


    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    
    const handleSend = (valores: any, resetForm: any) => {
        handleOnSubmit(valores).then((r) => {
            setTimeout(() => handleClose(), 4000)
        });
    }

    const renderButtonSend = () => {
        if (loanding) {
            return (
                <Spinner animation="border"/>
            );
        } else {
            return (
                <Button variant="primary" onClick={handleOnSubmit}>
                    Guardar
                </Button>

            );
        }
    }
    return (

        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <ModalLoading show={true}/>
            <Modal.Header closeButton>
                <Modal.Title>Create Users</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={{
                        primerNombre:'',
                        primerApellido:'',
                        segundoApellido:'',
                        nombreCorto:'',
                        tipoDeIdentificacion:'',
                        noIdentificacion:'',
                        estadoCivil:'',
                        fechaNacimiento:'',
                        sexo:'',
                        direccionCorrespondencia:'',
                        correoElectronico:'',
                        codCiudadDirCorr:'',
                        celular:'',
                        sucursal:'',
                        indicativo:'',
                        actividadEconomica:'',
                        numeroSolicitud:'',
                        tipoDePersona:'',
                        codZonaPDirCorr:'',
                        tipoSolicitud:'',
                        cupoAsignado:'',
                        bin:'',
                        tipoExtracto:'',
                        tipoTarjeta:'',
                        codAfinidad:'',
                        codGrupoManejo:'',
                        codigoVendedor:'',
                        cicloFacturacion:''
                    }}
                    validate={(valores)=>{
                        let errores = {};

                        //Validacion primerNombre
                        if(!valores.primerNombre){
                            // @ts-ignore
                            errores.primerNombre = trans('ingreseNombre')
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.primerNombre)){
                            // @ts-ignore
                            errores.primerNombre = trans('validacionNombre')
                        }

                        //Validacion primerApellido
                        if(!valores.primerApellido){
                            // @ts-ignore
                            errores.primerApellido = trans('ingreseApellido')
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.primerApellido)){
                            // @ts-ignore
                            errores.primerApellido = trans('validacionApellido')
                        }

                        //Validacion segundoApellido
                        if(!valores.segundoApellido){
                            // @ts-ignore
                            errores.segundoApellido = trans('ingreseApellido')
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.segundoApellido)){
                            // @ts-ignore
                            errores.segundoApellido = trans('validacionApellido')
                        }

                        //Validacion nombreCorto
                        if(!valores.nombreCorto){
                            // @ts-ignore
                            errores.nombreCorto = trans('ingreseNombreCorto')
                        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreCorto)){
                            // @ts-ignore
                            errores.nombreCorto = trans('validacionNombreCorto')
                        }

                        //Validacion tipoDeIdentificacion
                        if(!valores.tipoDeIdentificacion){
                            // @ts-ignore
                            errores.tipoDeIdentificacion = trans('seleccionTipoIdentificacion')
                        }

                        //Validacion noIdentificacion
                        if(!valores.noIdentificacion){
                            // @ts-ignore
                            errores.noIdentificacion = trans('ingreseNroIdentificacion')
                        }else if(!/^[0-9]+$/.test(valores.noIdentificacion)){
                            // @ts-ignore
                            errores.noIdentificacion = trans('validacionNroIdentificacion')
                        }

                        //Validacion estadoCivil
                        if(!valores.estadoCivil){
                            // @ts-ignore
                            errores.estadoCivil = trans('seleccioneEstadoCivil')
                        }

                        //Validacion fechaNacimiento
                        if(!valores.fechaNacimiento){
                            // @ts-ignore
                            errores.fechaNacimiento = trans('seleccioneFechaNacimiento')
                        }

                        //Validacion sexo
                        if(!valores.sexo){
                            // @ts-ignore
                            errores.sexo = trans('seleccioneSexo')
                        }

                        //Validacion direccionCorrespondencia
                        if(!valores.direccionCorrespondencia){
                            // @ts-ignore
                            errores.direccionCorrespondencia = trans('ingreseDireccion')
                        }

                        //Validacion correoElectronico
                        if(!valores.correoElectronico){
                            // @ts-ignore
                            errores.correoElectronico = trans('ingreseCorreoElect')
                        }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correoElectronico)){
                            // @ts-ignore
                            errores.correoElectronico = trans('validacionCorreoElect')
                        }

                        //Validacion codCiudadDirCorr
                        if(!valores.codCiudadDirCorr){
                            // @ts-ignore
                            errores.codCiudadDirCorr = trans('ingreseCodigoDireccion')
                        }else if(!/^[0-9]+$/.test(valores.codCiudadDirCorr)){
                            // @ts-ignore
                            errores.codCiudadDirCorr = trans('validacionCodigoDireccion')
                        }

                        //Validacion celular
                        if(!valores.celular){
                            // @ts-ignore
                            errores.celular = trans('ingreseCelular')
                        }else if(!/^[0-9]+$/.test(valores.celular)){
                            // @ts-ignore
                            errores.celular = trans('validacionCelular')
                        }

                        //Validacion sucursal
                        if(!valores.sucursal){
                            // @ts-ignore
                            errores.sucursal = trans('ingreseSucursal')
                        }else if(!/^[0-9]+$/.test(valores.sucursal)){
                            // @ts-ignore
                            errores.sucursal = trans('validacionSucursal')
                        }

                        //Validacion indicativo
                        if(!valores.indicativo){
                            // @ts-ignore
                            errores.indicativo = trans('ingreseIndicativo')
                        }else if(!/^[0-9]+$/.test(valores.indicativo)){
                            // @ts-ignore
                            errores.indicativo = trans('validacionIndicativo')
                        }

                        //Validacion actividadEconomica
                        if(!valores.actividadEconomica){
                            // @ts-ignore
                            errores.actividadEconomica = trans('ingreseActivEconomica')
                        }else if(!/^[0-9]+$/.test(valores.actividadEconomica)){
                            // @ts-ignore
                            errores.actividadEconomica = trans('validacionActivEconomica')
                        }

                        //Validacion numeroSolicitud
                        if(!valores.numeroSolicitud){
                            // @ts-ignore
                            errores.numeroSolicitud = trans('ingreseNumSolicitud')
                        }else if(!/^[0-9]+$/.test(valores.numeroSolicitud)){
                            // @ts-ignore
                            errores.numeroSolicitud = trans('validacionNumSolicitud')
                        }

                        //Validacion tipoDePersona
                        if(!valores.tipoDePersona){
                            // @ts-ignore
                            errores.tipoDePersona = trans('seleccioneTipoPersona')
                        }

                        //Validacion codZonaPDirCorr
                        if(!valores.codZonaPDirCorr){
                            // @ts-ignore
                            errores.codZonaPDirCorr = trans('seleccioneCodZonaDirr')
                        }

                        //Validacion tipoSolicitud
                        if(!valores.tipoSolicitud){
                            // @ts-ignore
                            errores.tipoSolicitud = trans('seleccioneTipoSolicitud')
                        }

                        //Validacion cupoAsignado
                        if(!valores.cupoAsignado){
                            // @ts-ignore
                            errores.cupoAsignado = trans('ingreseCupoAsignado')
                        }else if(!/^[0-9]+$/.test(valores.cupoAsignado)){
                            // @ts-ignore
                            errores.cupoAsignado = trans('validacionCupoAsignado')
                        }

                        //Validacion bin
                        if(!valores.bin){
                            // @ts-ignore
                            errores.bin = trans('ingreseBin')
                        }else if(!/^[0-9]+$/.test(valores.bin)){
                            // @ts-ignore
                            errores.bin = trans('validacionBin')
                        }

                        //Validacion tipoExtracto
                        if(!valores.tipoExtracto){
                            // @ts-ignore
                            errores.tipoExtracto = trans('seleccioneTipoExtracto')
                        }

                        //Validacion tipoTarjeta
                        if(!valores.tipoTarjeta){
                            // @ts-ignore
                            errores.tipoTarjeta = trans('seleccioneTipoTarjeta')
                        }

                        //Validacion codAfinidad
                        if(!valores.codAfinidad){
                            // @ts-ignore
                            errores.codAfinidad = trans('seleccioneCodAfinidad')
                        }

                        //Validacion codGrupoManejo
                        if(!valores.codGrupoManejo){
                            // @ts-ignore
                            errores.codGrupoManejo = trans('seleccioneCodGrupoManejo')
                        }

                        //Validacion codigoVendedor
                        if(!valores.codigoVendedor){
                            // @ts-ignore
                            errores.codigoVendedor = trans('seleccioneCodigoVendedor')
                        }

                        //Validacion cicloFacturacion
                        if(!valores.cicloFacturacion){
                            // @ts-ignore
                            errores.cicloFacturacion = trans('seleccioneCicloFacturacion')
                        }

                        return errores;
                    }}
                    onSubmit={(valores, {resetForm}) => {
                        handleSend(valores, resetForm)
                    }}
                >
                    {({values, errors, handleSubmit, touched, handleBlur, handleChange})=>(
                <Formulario onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>primerNombre</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseNombre')}
                                    id="primerNombre"
                                    name="primerNombre"
                                    value={values.primerNombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.primerNombre && errors.primerNombre && <Col className="text-error">{errors.primerNombre}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>primerApellido</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseApellido')}
                                    id="primerApellido"
                                    name="primerApellido"
                                    value={values.primerApellido}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.primerApellido && errors.primerApellido && <Col className="text-error">{errors.primerApellido}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>segundoApellido</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseApellido')}
                                    id="segundoApellido"
                                    name="segundoApellido"
                                    value={values.segundoApellido}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.segundoApellido && errors.segundoApellido && <Col className="text-error">{errors.segundoApellido}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>nombreCorto</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseNombreCorto')}
                                    id="nombreCorto"
                                    name="nombreCorto"
                                    value={values.nombreCorto}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.nombreCorto && errors.nombreCorto && <Col className="text-error">{errors.nombreCorto}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>tipoDeIdentificacion</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="tipoDeIdentificacion"
                                    name="tipoDeIdentificacion"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectTipoId.map((item: any) =>
                                            <option value={item.descCorta} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.tipoDeIdentificacion && errors.tipoDeIdentificacion && <Col className="text-error">{errors.tipoDeIdentificacion}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>noIdentificacion</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseNroIdentificacion')}
                                    id="noIdentificacion"
                                    name="noIdentificacion"
                                    value={values.noIdentificacion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.noIdentificacion && errors.noIdentificacion && <Col className="text-error">{errors.noIdentificacion}</Col>}
                            </Col>
                        </Form.Group>


                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>estadoCivil</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="estadoCivil"
                                    name="estadoCivil"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectCivil.map((item: any) =>
                                            <option value={item.id} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.estadoCivil && errors.estadoCivil && <Col className="text-error">{errors.estadoCivil}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>fechaNacimiento</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder=" DD / MM / AAAA"
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    value={values.fechaNacimiento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            {touched.fechaNacimiento && errors.fechaNacimiento && <Col className="text-error">{errors.fechaNacimiento}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>sexo</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="sexo"
                                    name="sexo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectSexo.map((item: any) =>
                                            <option value={item.id} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.sexo && errors.sexo && <Col className="text-error">{errors.sexo}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>direccionCorrespondencia</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseDireccion')}
                                    id="direccionCorrespondencia"
                                    name="direccionCorrespondencia"
                                    value={values.direccionCorrespondencia}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.direccionCorrespondencia && errors.direccionCorrespondencia && <Col className="text-error">{errors.direccionCorrespondencia}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>correoElectronico</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder={trans('ingreseCorreoElect')}
                                    id="correoElectronico"
                                    name="correoElectronico"
                                    value={values.correoElectronico}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.correoElectronico && errors.correoElectronico && <Col className="text-error">{errors.correoElectronico}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>codCiudadDirCorr</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseCodigoDireccion')}
                                    id="codCiudadDirCorr"
                                    name="codCiudadDirCorr"
                                    value={values.codCiudadDirCorr}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.codCiudadDirCorr && errors.codCiudadDirCorr && <Col className="text-error">{errors.codCiudadDirCorr}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>celular</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseCelular')}
                                    id="celular"
                                    name="celular"
                                    value={values.celular}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.celular && errors.celular && <Col className="text-error">{errors.celular}</Col>}
                            </Col>
                            <Form.Label column sm="2"><Trans>sucursal</Trans></Form.Label>
                            <Col sm="2">
                                <Form.Control
                                    type="text"
                                    placeholder={trans('ingreseSucursal')}
                                    id="sucursal"
                                    name="sucursal"
                                    value={values.sucursal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.sucursal && errors.sucursal && <Col className="text-error">{errors.sucursal}</Col>}
                            </Col>
                            <Form.Label column sm="1"><Trans>indicativo</Trans></Form.Label>
                            <Col sm="1">
                                <Form.Control
                                    type="number"
                                    id="indicativo"
                                    name="indicativo"
                                    value={values.indicativo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.indicativo && errors.indicativo && <Col className="text-error">{errors.indicativo}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>actividadEconomica</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseActivEconomica')}
                                    id="actividadEconomica"
                                    name="actividadEconomica"
                                    value={values.actividadEconomica}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.actividadEconomica && errors.actividadEconomica && <Col className="text-error">{errors.actividadEconomica}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>numeroSolicitud</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseNumSolicitud')}
                                    id="numeroSolicitud"
                                    name="numeroSolicitud"
                                    value={values.numeroSolicitud}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.numeroSolicitud && errors.numeroSolicitud && <Col className="text-error">{errors.numeroSolicitud}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>tipoDePersona</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="tipoDePersona"
                                    name="tipoDePersona"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectTipoPersona.map((item: any) =>
                                            <option value={item.descCorta} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.tipoDePersona && errors.tipoDePersona && <Col className="text-error">{errors.tipoDePersona}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>codZonaPDirCorr</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="codZonaPDirCorr"
                                    name="codZonaPDirCorr"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectCodZonaDirr.map((item: any) =>
                                            <option value={item.id} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.codZonaPDirCorr && errors.codZonaPDirCorr && <Col className="text-error">{errors.codZonaPDirCorr}</Col>}
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>tipoSolicitud</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="tipoSolicitud"
                                    name="tipoSolicitud"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectTipoSolicitud.map((item: any) =>
                                            <option value={item.id} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.tipoSolicitud && errors.tipoSolicitud && <Col className="text-error">{errors.tipoSolicitud}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>cupoAsignado</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseCupoAsignado')}
                                    id="cupoAsignado"
                                    name="cupoAsignado"
                                    value={values.cupoAsignado}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.cupoAsignado && errors.cupoAsignado && <Col className="text-error">{errors.cupoAsignado}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>bin</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={trans('ingreseBin')}
                                    id="bin"
                                    name="bin"
                                    value={values.bin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.bin && errors.bin && <Col className="text-error">{errors.bin}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>tipoExtracto</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="tipoExtracto"
                                    name="tipoExtracto"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectTipoExtracto.map((item: any) =>
                                            <option value={item.descCorta} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.tipoExtracto && errors.tipoExtracto && <Col className="text-error">{errors.tipoExtracto}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>tipoTarjeta</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="tipoTarjeta"
                                    name="tipoTarjeta"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectTipoTarjeta.map((item: any) =>
                                            <option value={item.descripcion} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.tipoTarjeta && errors.tipoTarjeta && <Col className="text-error">{errors.tipoTarjeta}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>codAfinidad</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="codAfinidad"
                                    name="codAfinidad"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectCodigoAfinidad.map((item: any) =>
                                            <option value={item.descripcion} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.codAfinidad && errors.codAfinidad && <Col className="text-error">{errors.codAfinidad}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2"><Trans>codGrupoManejo</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="codGrupoManejo"
                                    name="codGrupoManejo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectGrupoManejo.map((item: any) =>
                                            <option value={item.descripcion} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.codGrupoManejo && errors.codGrupoManejo && <Col className="text-error">{errors.codGrupoManejo}</Col>}
                            </Col>

                            <Form.Label column sm="2"><Trans>codigoVendedor</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="codigoVendedor"
                                    name="codigoVendedor"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectCodigoVendedor.map((item: any) =>
                                            <option value={item.codigo} key={item.id}>{item.codigo}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.codigoVendedor && errors.codigoVendedor && <Col className="text-error">{errors.codigoVendedor}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">

                            <Form.Label column sm="2"><Trans>cicloFacturacion</Trans></Form.Label>
                            <Col sm="4">
                                <Form.Select
                                    required
                                    aria-label="Default select example"
                                    id="cicloFacturacion"
                                    name="cicloFacturacion"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option></option>
                                    {
                                        selectCicloFacturacion.map((item: any) =>
                                            <option value={item.descripcion} key={item.id}>{item.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                                {touched.cicloFacturacion && errors.cicloFacturacion && <Col className="text-error">{errors.cicloFacturacion}</Col>}
                            </Col>

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3">
                            {renderShowAlert()}
                            <Col sm="10" style={{paddingTop:50, paddingLeft:900, justifyContent:'space-between'}}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </Col>
                            <Col sm="2" style={{paddingTop:50, paddingLeft:100, justifyContent:'space-between'}}>
                                <Button variant="primary" type="submit">Guardar</Button>
                            </Col>
                        </Form.Group>
                    </Row>
                </Formulario>
                )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

ModalRolUser.propTypes = {
    setShow: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}