import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table,Modal, ModalHeader, ModalBody, ModalFooter , Card,CardBody,CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit, FaTrash ,FaExclamationTriangle,FaRupeeSign} from 'react-icons/fa';
import base_url from '../../api/bootapi';
import { toast } from 'react-toastify';
import { Bar, Doughnut } from 'react-chartjs-2';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  
  useEffect(() => {
    fetchincomes();
    fetchExpenses();
  }, []);

  const fetchincomes = async () => {
    try {
      const response = await axios.get(`${base_url}/get-incomes/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const incomesData = response.data.map(Income => ({
        ...Income,
        amount: parseFloat(Income.amount)
      }));
      setIncomes(incomesData);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${base_url}/get-expenses/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const expensesData = response.data.map(expense => ({
        ...expense,
        amount: parseFloat(expense.amount)
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async () => {
    const newExpense = { title, amount: parseFloat(amount), date, category, useremail: useremail };
    try {
      if (editingId) {
        await axios.put(`${base_url}/update-expense/${editingId}`, newExpense,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses(expenses.map(exp => (exp.id === editingId ? { ...exp, ...newExpense } : exp)));
        setEditingId(null);
        toast.success('Expense updated successfully!!');
      } else {
        await axios.post(`${base_url}/add-expense`, newExpense, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses([...expenses, newExpense]);
        toast.success('Expense added  successfully!!');
      }
      setTitle('');
      setAmount('');
      setDate('');
      setCategory('');

    } catch (error) {
        toast.error('Something went wrong..Try again!!');
      console.error('Error adding/updating expense:', error);
    }
  };
  
  const handleDeleteExpense = async () => {
    try {
      await axios.delete(`${base_url}/delete-expense/${expenseToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpenses(expenses.filter(expense => expense.id !== expenseToDelete));
      setDeleteModalOpen(false);
    toast.success('Expense deleted successfully..');
   
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (id) => {
    const expense = expenses.find(exp => exp.id === id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
    setCategory(expense.category);
    setEditingId(id);
  };

  const toggleDeleteModal = (expenseId) => {
    setExpenseToDelete(expenseId);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const [expensePie,setExpensePie] = useState({
    labels: ['Available', 'Expense'],
            datasets: [
            {
                data: [],
                backgroundColor: ['#8F00FF', '#FFA500'],
            },
            ],
        });

  const [expenseProgress, setExpenseProgress] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Tasks Bar',
        data: [],
        backgroundColor: '#8F00FF',
      },
    ],
  });

  useEffect(()=>{
    // Categorize tasks
    const categories = ['Health', 'Food', 'Travel', 'Education', 'Housing', 'Entertainment','Other'];
    setExpenseProgress({
       labels: categories,
       datasets: [
         {
           label: 'Total Expenses Bar',
           data: categories.map(cat => expenses.filter(expense => expense.category === cat).reduce((acc, expense) => acc + (expense.amount || 0), 0)),
           backgroundColor: 'rgb(240 130 191)',
         },
       ],
     });

    setExpensePie({
        labels: ['Available', 'Expense'],
        datasets: [
        {
            data: [Available,totalExpense],
            backgroundColor: ['rgb(107 226 138)', 'rgb(240 130 191)'],
        },
        ],
    });

},[expenses]);




  const totalExpense = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
  const totalIncome = incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
  const Available = totalIncome - totalExpense;

  return (
    <Container className="mt-5">

<Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <CardBody>
            <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{totalIncome}</CardTitle>
              <p>Total Incomes</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <CardBody>
              <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{totalExpense}</CardTitle>
              <p>Total Expenses</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <CardBody>
            <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{Available}</CardTitle>
              <p>Available Balance</p>
            </CardBody>
          </Card>
        </Col>
      </Row>


      {/** total  expense  category */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle>Total Expense Of Each Category</CardTitle>
              <Bar data={expenseProgress} />
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle>Expense Report</CardTitle>
              <Doughnut data={expensePie} />
            </CardBody>
          </Card>
        </Col>
      </Row>


      <Row>
        <Col md="4">
        <Card>
            <CardBody>
              <CardTitle style={{fontSize:'20px'}}>{editingId ? 'Update Expense' : 'Add Expense'}</CardTitle>
              <Form className="expense-form mt-4">
                <FormGroup>
                  <Label for="title">Expense Title</Label>
                  <Input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Expense Amount</Label>
                  <Input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input type="select" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                    <option value="Housing">Housing</option>
                    <option value="Education">Education</option>
                    <option value="Food">Food</option>
                    <option value="Work">Work</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
                
                <Button className='bg-success'  style={{border:'none',borderRadius:'40px'}} onClick={handleAddExpense}>{editingId ? 'Update Expense' : 'Add Expense'}</Button>
              </Form>
              </CardBody>
          </Card>
        </Col>
        <Col md="8">
           <div style={{height:'500px',overflowY:'auto'}}>
           <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td><FaRupeeSign/>{expense.amount.toFixed(2)}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
              
                  <td>
                    <FaEdit className='text-primary' onClick={() => handleEditExpense(expense.id)} style={{ cursor: 'pointer', marginRight: '10px'}} />
                    <FaTrash  className='text-danger' onClick={() => toggleDeleteModal(expense.id)} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
       
        </Col>
      </Row>

        {/* Delete confirmation modal */}
     <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} centered>
      <ModalHeader toggle={toggleDeleteModal}>
        <FaExclamationTriangle style={{ marginRight: '10px', color: 'red' }} />
        Confirm Delete
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete this expense?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDeleteExpense}>Delete</Button>
        <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
       
  
    </Container>
  );
};

export default Expenses;
