var Link = require('react-router').Link;

var Profile = require('../../components/profile/profile');

var Header = module.exports = React.createClass({
    render: function () {
        return (
            <div className='panel panel--top'>
                <div className='project'>
                    <div className='project__logo'>
                        <Link className='logo__text__a' to='/'>
                            Онлайн.Код
                        </Link>
                    </div>
                    <span className='project__name'>
                        &nbsp;/&nbsp;{this.props.doc.name}
                    </span>
                </div>
                <a ref='downloadLink' className='project__download' onMouseDown={this.download}/>
                {this.props.user !== undefined && <Profile user={this.props.user}/>}
            </div>
        );
    },

    download: function () {
        var doc = this.props.doc;
        var downloadLink = this.refs.downloadLink;
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(doc.text));
        downloadLink.setAttribute('download', doc.name);
    }
});
