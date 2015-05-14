var App = React.createClass({
  render:function() {
    return (
      <div>
        <Header/>
        <RouteHandler/>
      </div>
    )
  }
});
module.exports = App;