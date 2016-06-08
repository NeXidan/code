var Profile = require('../../components/profile/profile');

var Header = module.exports = React.createClass({
    componentDidMount: function () {
        this.download(this.props.doc);
    },

    componentWillReceiveProps: function (nextProps) {
        this.download(nextProps.doc);
    },

    render: function () {
        return (
            <div className='panel panel--top'>
                <div className='project'>
                    <div className='project__logo'>
                        <a className='logo__text__a' href='/'>
                            Онлайн.Код
                        </a>
                    </div>
                    <span className='project__name'>
                        &nbsp;/&nbsp;{this.props.doc.name}
                    </span>
                </div>
                <a ref='downloadLink' className='project__download'/>
                {this.props.user !== undefined && <Profile user={this.props.user}/>}
            </div>
        );
    },

    download: function (doc) {
        var downloadLink = this.refs.downloadLink;
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(doc.text));
        downloadLink.setAttribute('download', doc.name);
    }
});
