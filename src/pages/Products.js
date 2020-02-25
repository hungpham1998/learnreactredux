import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import { addProductToCart, removeProduct, searchProduct, addProduct, updateProduct} from '../store/actions';
import './Products.css';
import { Button, Form, FormGroup, Label, Input,Card,CardBody ,CardTitle,CardSubtitle} from 'reactstrap';
class ProductsPage extends Component {
  constructor(props){
    super(props);
    this.state =({
      search: '',
       title: '',
       price: 0,
       id: null,
       formdisplay: false,
    })
  }

   addProduct=  ()=>{
      if( this.state.id === 0 ){
        let id = this.props.products &&  this.props.products.length + 1;
        var newproduct = {
          id: id ,
          title: this.state.title,
          price: this.state.price
         }
        this.props.addProduct(newproduct);
      }
    else 
    {
      var product ={
        id: this.state.id,
        title: this.state.title,
        price: this.state.price
      }
       this.props.updateProduct(product);
    }
  }

  checkUpdate = (id) =>{
    let products = this.props.products;
    let item = products.filter(item => item.id === id  );
    item.map(data => {
      if(data.id === id)
      {
        this.setState({
          title: data.title,
          price: data.price,
          id: data.id
        })
      }
      return data;
    })
    this.setState({
      formdisplay: true,
    })

  }
 
  render() {
    return (
      <React.Fragment>
        <MainNavigation cartItemNumber={this.props.cartItemCount} />
        <div style={{ margin: 'auto', width: 245, paddingTop: 20 ,display: this.state.formdisplay === true? 'block': 'none'}}>
          <Form>
            <FormGroup>
              <Label for="title">title</Label>
              <Input type="text" name="title" id="title" placeholder="title a placeholder" value={this.state.title}  onChange={(e)=>{this.setState({ title: e.target.value}) }} />
            </FormGroup>
           <FormGroup>
              <Label for="price">price</Label>
              <Input type="price" name="Number" id="price" placeholder="price " value={this.state.price}  onChange={(e)=>{ this.setState({ price: e.target.value})}} />
            </FormGroup>
          <Button type='submit' onClick= {(e)=> { e.preventDefault();this.addProduct() }}> Luu lai</Button>
          <Button onClick={()=>{this.setState({formdisplay: false })}}>Thoat</Button>
          </Form>
        </div>
        <main className="products">
        <div>
          <form><b> Tim kiếm </b> <input value={this.state.search} onChange={(e)=> {
            this.setState({
            search: e.target.value
          })}}/> 
          <button onClick={e => {
            e.preventDefault()
            this.props.searchProduct(this.state.search)
          }}> Tìm Kiếm </button>
          </form>
          <button onClick={ e => {this.setState({formdisplay: !this.state.formdisplay}) }} > 
               add product
          </button>
        </div>
          {/* <ul>
            {this.props.products.map((product) => (
              <li key={product.id}>
                <div> <strong > {product && product.id} </strong></div>
                <div>
                  <strong>{product && product.title}</strong> - ${product && product.price}
                </div>
                <div>
                  <button style={{ marginRight: 10}} onClick={()=>{this.checkUpdate(product.id)}}> 
                    update
                  </button>
                  <button style={{ marginRight:10}} onClick={()=> this.props.removeProduct(product)}>
                    remove 
                  </button>
                  <button
                    onClick={()=>this.props.addProductToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul> */}
          {this.props.products.map((product) => (
            <div style={{borderRadius:' 1 solid green'}}>
              <Card>
                <CardBody>
                  <CardTitle> title : {product.title}</CardTitle>
                  <CardSubtitle>Price: {product.price} $</CardSubtitle>
                   <Button style={{ marginRight: 10}} onClick={()=>{this.checkUpdate(product.id)}}> 
                    update
                  </Button>
                  <Button style={{ marginRight:10}} onClick={()=> this.props.removeProduct(product)}>
                    remove 
                  </Button>
                  <Button
                    onClick={()=>this.props.addProductToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    cartItemCount: state.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0),
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: product => dispatch(addProductToCart(product)),
    removeProduct: (product) => dispatch(removeProduct(product)),
    searchProduct: search => dispatch(searchProduct(search)),
    addProduct:  product => dispatch(addProduct(product)),
    updateProduct: product => dispatch(updateProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
