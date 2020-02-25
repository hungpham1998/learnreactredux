import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import { addProductToCart, removeProduct, searchProduct, addProduct } from '../store/actions';
import './Products.css';

class ProductsPage extends Component {
  constructor(props){
    super(props);
    this.state =({
      search: '',
       title: '',
       price: 0 
    })
  }

   onSubmit= async (event)=>{
    console.log(this.state)
      event.preventDefault()
      let id = this.props.products &&  this.props.products.length + 1;
      var newproduct = {
        id: id ,
        title: this.state.title,
        price: this.state.price
      }
      console.log(newproduct);
        this.props.addProduct(newproduct);
  }


  render() {
    return (
      <React.Fragment>
        <MainNavigation cartItemNumber={this.props.cartItemCount} />
        <div style={{ margin: 'auto', width: 120}}>
          <form name='add'>
            <b> title : </b> <input  value={this.state.title}  onChange={(e)=>{
              this.setState({ title: e.target.value}) }} name="title"/> <br />
            <b> price : </b> <input type="Number"  value={this.state.price}  onChange={(e)=>{ this.setState({ price: e.target.value})}} name="price"/> <br />
            
            <button type='submit' onClick= {this.onSubmit}>Luu Lai </button>
          </form>
        </div>
        <main className="products">
        <div>
          <button > 
               add product
          </button>
          <form><b> Tim kiếm </b> <input value={this.state.search} onChange={(e)=> {
            this.setState({
            search: e.target.value
          })}}/> 
          <button onClick={e => {
            e.preventDefault()
            this.props.searchProduct(this.state.search)
          }}> Tìm Kiếm </button>
          </form>
        </div>
          <ul>
            {this.props.products.map((product) => (
              <li key={product.id}>
                <div> <strong > {product && product.id} </strong></div>
                <div>
                  <strong>{product && product.title}</strong> - ${product && product.price}
                </div>
                <div>
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
          </ul>
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
    addProduct:  product => dispatch(addProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
