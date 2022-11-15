import React from 'react'
import {usePagination, useTable} from 'react-table'
import {Button, Col, Container, Nav, Navbar, Row, Table} from "react-bootstrap";


export function ListUsers() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'idUsuario',
            },
            {
                Header: 'Tipo de documento',
                accessor: 'tipoDoc',
            },
            {
                Header: 'Número de documento',
                accessor: 'numDocumento',
            },
            {
                Header: 'Nombres',
                accessor: 'usuNombres',
            },
            {
                Header: 'Apellidos',
                accessor: 'usuApellido',
            },
            {
                Header: 'Fecha expedición documento',
                accessor: 'usuFechaExpedicion',
            },
            {
                Header: 'Correo',
                accessor: 'usuCorreo',
            },
            {
                Header: 'Teléfono',
                accessor: 'usuTelefono',
            },

        ],
        []
    )
    const DATA = [

        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
        {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        }, {
            'idUsuario': '0',
            'tipoDoc': 'CC',
            'numDocumento': '1036773894',
            'usuNombres': 'Marcos',
            'usuApellido': 'Acosta',
            'usuFechaExpedicion': '14/02/2022',
            'usuContrasena': 'pruebas123*',
            'usuCorreo': 'pruebas@gmail.com',
            'usuTelefono': '3007175689',
            'usuHashKey': 'BVFF7534JH45H'
        },
    ]

    return <>
        <Navbar style={{backgroundColor: "#EDF0F7"}} variant="light">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Inicio</Nav.Link>
                    <Nav.Link href="#features">Quienes somos</Nav.Link>
                    <Nav.Link href="#pricing">Productos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Row className={"py-5"}>
            <Col className={"col-lg-3 col-xxl-2 px-5 d-none d-lg-block"}>
                <Row className={"py-4"}>
                    <Col className={"col-4"}>
                        <div className={"bg-dark rounded-circle shadow shadow-lg"}
                             style={{height: "48px", width: "48px"}}/>
                    </Col>
                    <Col className={"col-8 text-start"}>
                        <h6>Administrator</h6>
                        <p className={"text-nowrap"}>Frank Underwood</p>
                    </Col>
                </Row>

                <Row className={"ps-4"}>
                    <p style={{cursor: "pointer"}}>Dashboard</p>
                    <p style={{cursor: "pointer"}}>Projects</p>
                    <p className={"rounded py-2 bg-light"} style={{cursor: "pointer"}}>Users</p>
                    <p style={{cursor: "pointer"}}>Task</p>
                    <p style={{cursor: "pointer"}}>Members</p>
                    <p style={{cursor: "pointer"}}>Hour Records</p>
                </Row>
            </Col>

            <Col className={"col-12 col-lg-9 col-xxl-10"}>
                <div className={"overflow-auto px-md-5"}>
                    <TableRender className={'col-md-8'} columns={columns} data={DATA}/>
                </div>
            </Col>
        </Row>

        <Row style={{backgroundColor: "#EDF0F7"}}>
            <Row className={"text-white"}>
                <Col className={"p-5"} style={{backgroundColor: "orangered", opacity: 0.7}}>
                    <h4>Search</h4>
                    <p>SEO/Google Ads</p>
                    <p>Youtube Ads</p>
                    <p>Google Shopping</p>
                </Col>
                <Col className={"p-5"} style={{backgroundColor: "red", opacity: 0.7}}>
                    <h4>CRO</h4>
                    <p>Analysis</p>
                    <p>Multi variant testing</p>
                    <p>Landing pages</p>
                </Col>
                <Col className={"p-5"} style={{backgroundColor: "#F7BF68"}}>
                    <h4>Social Media</h4>
                    <p>Facebook</p>
                    <p>Youtube Ads</p>
                    <p>Google Shopping</p>
                </Col>
            </Row>

            <Row>
                <Col className={"col-lg-4 p-5 fw-bold"} style={{backgroundColor: "orange", opacity: 0.7}}>
                    <h4>Other services</h4>
                    <p>Marketing</p>
                    <p>Digital tools</p>
                    <p>Banner advertising</p>
                </Col>
                <Col className={"col-lg-8 p-5 fw-bold text-white"} style={{backgroundColor: "#4C545C"}}>
                    <div className={"col-lg-7"}>
                        <h4>Do you want to increase your sales and reach your goals?</h4>
                        <p>Schedule a free, no-obligation conversation with one of our experts to quickly
                            improve the result of your business</p>
                        <Button variant={"light"}>Book a conversation</Button>
                    </div>
                    <div className={"col-lg-5"}/>
                </Col>
            </Row>
        </Row>
    </>
}

function TableRender({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable({
        columns,
        data,
    }, usePagination)


    // Render the UI for your table
    return (
        <>
            <Table striped bordered hover {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                {' '}
                <span>
          Page{' '}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                <span>
          | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '100px'}}
                    />
        </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}


