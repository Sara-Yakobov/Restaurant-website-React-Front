import React from 'react';
import { AppBar, Toolbar, Typography, Button, CardMedia, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import picture from './image/KARELA-09140.jpg';
import { API_URL } from './config';

function Menu({ categories }) {
  const params = useParams();
  const [dishes, setDishes] = React.useState([]);

  React.useEffect(() => {
    if (params.id === undefined) {
      fetchDishes();
    } else {
      filterByCategory(params.id);
    }
  }, [params.id]);

  function fetchDishes() {
    axios.get(`${API_URL}/dishes`)
      .then(response => {
        setDishes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function filterByCategory(category_id) {
    axios.get(`${API_URL}/dishes?category_id=${category_id}`)
      .then(response => {
        setDishes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${picture})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            התפריט שלנו
          </Typography>
          <div>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to={`/category/${category.id}`}
                sx={{ mx: 2, textTransform: "none", fontSize: "1.5rem" }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dishes.map((dish) => (
          <Card key={dish.id} sx={{ width: 400, margin: '10px', padding: '20px', backgroundColor: 'white' }}>
            <CardMedia
              component="img"
              height="300"
              image={dish.imageUrl}
              alt={dish.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {dish.name} - ₪{dish.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dish.description}
              </Typography>
              {dish.is_gluten_free && (
                <Typography variant="body2" color="text.secondary">
                  מכיל גלוטן
                </Typography>
              )}
              {dish.is_vegetarian && (
                <Typography variant="body2" color="text.secondary">
                  (המנה צמחונית)
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Menu;
