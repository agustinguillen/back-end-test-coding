import { Container, Row, Col } from 'react-bootstrap';
import { axios } from '../axios';
import { useEffect, useState } from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
 
const Graphics = () => {
  const [categoriesStock, setCategoriesStock] = useState([]);
  const [productsByDiscount, setProductsByDiscount] = useState([]);
  const [categoriesByMaxDiscount, setCategoriesByMaxDiscount] = useState([]);
  const [categoriesByMinDiscount, setCategoriesByMinDiscount] = useState([]);
  const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]

  useEffect(() => {
    getCategoriesStock();
    getProductsByDiscount();
    getCategoriesByMaxDiscount();
    getCategoriesByMinDiscount();
  }, []);

  const getCategoriesStock = async () => {
    const response = await axios.get("/categories-stock").catch((err) => {
      console.error("Error:", err);
    });

    if (response && response.data) {
      setCategoriesStock(response.data)
    }
  };

  const getProductsByDiscount = async () => {
    const response = await axios.get("/products-by-discount").catch((err) => {
      console.error("Error:", err);
    });

    if (response && response.data) {
      setProductsByDiscount(response.data);
    }
  };

  const getCategoriesByMaxDiscount = async () => {
    const response = await axios
      .get("/categories-max-discount")
      .catch((err) => {
        console.error("Error:", err);
      });

    if (response && response.data) {
      setCategoriesByMaxDiscount(response.data);
    }
  };

  const getCategoriesByMinDiscount = async () => {
    const response = await axios
      .get("/categories-min-discount")
      .catch((err) => {
        console.error("Error:", err);
      });

    if (response && response.data) {
      setCategoriesByMinDiscount(response.data);
    }
  };

  const data1 = {
    labels: categoriesStock.map(data => `${data.product_category}: ${data.Total}`),
    datasets: [
      {
        label: 'Stock per Category',
        data: categoriesStock.map(data => data.Total),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: productsByDiscount.map(data => `${data.product_discount}: ${data.Total}`),
    datasets: [
      {
        label: 'Stock by Discount',
        data: productsByDiscount.map(data => data.Total),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options2 = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data3 = {
    labels: categoriesByMaxDiscount.map(data => `${data.product_category}: ${data.percent}`),
    datasets: [
      {
        label: '# of Votes',
        data: categoriesByMaxDiscount.map(data => data.percent),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const data4 = {
    labels: categoriesByMinDiscount.map(data => `${data.product_category}: ${data.percent}`),
    datasets: [
      {
        label: '# of Votes',
        data: categoriesByMinDiscount.map(data => data.percent),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="text-center mt-3">
      <h1>Graphics</h1>
      <Row>
        <Col sm lg={6} className="p-5">
          <h3>Stock per Category</h3>
          <Doughnut data={data1} />
        </Col>
        <Col sm lg={6} className="p-5">
          <h3>Stock by Discount</h3>
          <Bar data={data2} options={options2} />
        </Col>
      </Row>
      <Row>
        <Col sm lg={6} className="p-5">
          <h3>Categories By Max Discount</h3>
          <Pie data={data3} />
        </Col>
        <Col sm lg={6} className="p-5">
          <h3>Categories By Min Discount</h3>
          <Pie data={data4} />
        </Col>
      </Row>
    </Container>
  );
};

export default Graphics;