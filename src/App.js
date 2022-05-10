
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Table } from './styles';
import moment from 'moment';
import Pagination from './Pagination';
import api from './api/api';
import Calendar from 'react-calendar/dist/umd/Calendar';


function App() {
  //API
  const [items, setItems] = useState([]);
  //filtro
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  //datepicker
  const [value, setValue] = useState(new Date());
  //novo filtro
  const [busca, setBusca] = useState('');

  //busca dos dados api
  useEffect(() => {
    const fetchResourceTypes = async () => {
      const response = await
        fetch('http://127.0.0.1:9091/extrato')
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setData(result);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    };
    fetchResourceTypes();
  }, [])

  //Atualiza items sempre que data alterar.
  useEffect(() => {
    setItems(data);
  }, [setData])

   const handleChange = ({target}) =>{
     if(!target.value){
       setItems(data);
       return
     }

     setBusca(target.value)
    const lowerBusca = busca.toLowerCase();
     console.log(lowerBusca)

    const filtrados = data.filter((data) => data.nome_operador_transacao.includes(lowerBusca))
     setItems(filtrados)
   }

  //soma do saldo total
  const total = data.reduce((resultado, quantidade) => {
    return (resultado + quantidade.valor);
    console.log(resultado + quantidade.valor);
  }, 0);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <div>
          <div className='App-busca'>
            <table className='App-table-filter'>
              <thead>
                <tr>
                  <th><span>Data de Início</span></th>
                  <th><span >Data de Fim</span></th>
                  <th><span >Nome operador transação</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td><input id="fimPeriodo" type="date"
                    name="fimPeriodo"
                    placeholder="Data Início" /></td>

                  <td><input id="inicioPeriodo" type="date"
                    name="inicioPeriodo"
                  />
                  </td>
                  <td><input type="text"
                    className="form-input"
                    onChange={handleChange} 
                    id="input-table"
                    name="nomeOperador"
                  /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='search-btn'>
            <button id="searchBtn">Pesquisar</button>
          </div>

          <div className='saldo'>

            <span className='sp1'>Saldo total: R$ {total.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>

            <span className='sp2'>Saldo período: R$ </span>

          </div>

          <Table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Nome operador transação</th>
              </tr>
            </thead>
            <tbody>
              {items.map(operation => (
                <tr key={operation.id}>
                  <td> {moment.utc(operation.data_transferencia).format('DD/MM/YYYY')} </td>
                  <td>R$ {operation.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }).replace(".", ",")} </td>

                  <td> {operation.tipo} </td>
                  <td> {operation.nome_operador_transacao} </td>

                </tr>
              ))}
            </tbody>

          </Table>

        </div>
        <Pagination />
      </div>
    );
  }
}





export default App;
