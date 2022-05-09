const ATMDeposit = ({ onChange }) => {
  return (
    <label className="label huge">
      Deposit:
      <input type="number" onChange={onChange} />
      <input type="submit" />
    </label>
  )
}

const App = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleOnChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setValidTransaction(false);
    if (event.target.value <= 0) return;
    if (atmMode === 'Cash Back' && event.target.value > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    setIsDeposit(event.target.value === 'Deposit' ? true : false)
  }

  return (
    <div className='container '>
      <div className='form-container'>
        <form onSubmit={handleOnSubmit} className='form'>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {
          atmMode === '' ? '' :
          <div>
            <ATMDeposit onChange={handleOnChange} isValid={validTransaction} isDeposit={isDeposit}></ATMDeposit>
          </div>
        }
        </form>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));