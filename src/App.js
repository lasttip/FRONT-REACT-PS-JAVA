
import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import Pagination from './components/Paginator';
// import Calendar from 'react-calendar/dist/umd/Calendar';

function App() {
  const API_BASE = 'http://127.0.0.1:8090/extrato';
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
  const Api = useEffect(() => {
    const fetchResourceTypes = async () => {
      const response = await fetch(API_BASE,
        {
          // header('Access-Control-Allow-Origin: *'); 
          // headers =("Access-Control-Allow-Origin": "*")
          //body: 'foo=bar&blah=1'
        })
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          setData(result);
          setItems(result);
          return result;
        },
          (error) => {
            setIsLoaded(false);
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

  const handleChange = ({ target }) => {
    if (!target.value) {
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
      <div className="page">
        <section className="lists">
          <form>
            <div className='lineOne'>
              <input id="inicioPeriodo" type="date"
                name="inicioPeriodo"
                placeholder="Data Início" />

              <input id="fimPeriodo" type="date"
                name="fimPeriodo"
                placeholder="Data Fim" />

              <input type="text"
                className="form-input"
                onChange={handleChange}
                id="input-table"
                name="nomeOperador"
              />

            </div>


            <div className="btnSearch">
              <a className="btnBody" href='/'  > Pesquisar </a>
            </div>

          </form>

          <div className='saldo'>
            <span className='sp1'>Saldo total: R$ {total.toLocaleString('pt-br', { minimumFractionDigits: 2 })} </span>
            <span className='sp2'>Saldo período: R$ </span>

          </div>
         
            <table className='table'>
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
                    <td className='App-table-td'> {moment.utc(operation.data_transferencia).format('DD/MM/YYYY')} </td>
                    <td className='App-table-td'>R$ {operation.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }).replace(".", ",")} </td>

                    <td className='App-table-td'> {operation.tipo} </td>
                    <td className='App-table-td'> {operation.nome_operador_transacao} </td>

                  </tr>
                ))}
              </tbody>
            </table>
       
          <Pagination />

        </section>
        <footer className='footer'>
          2022
        </footer>
      </div>
    );
  }
}

export default App;
