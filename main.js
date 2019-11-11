// 头部
class Header extends React.Component {
    render() {

        return (
            <div style={{ overflow: 'hidden', height: '150px' }}>
                {this.props.children}
            </div>
        )
    }
}

// 导航栏
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.navLi = [
            { title: 'All', src: 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories' },
            { title: 'JavaScript', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories' },
            { title: 'Ruby', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories' },
            { title: 'Java', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories' },
            { title: 'CSS', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories' },
            { title: 'Python', src: '#' }
        ]

    }

    handleClick = (e) => {
        this.props.getData(e.target.name)
    }
    render() {
        const navbarStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
        }
        const navbarLiStyle = {
            margin: '0 5px',
            cursor: 'pointer',
            fontSize: '20px',
        }

        const navList = this.navLi.map((item, key) =>
            <li style={navbarLiStyle} key={item.title}><a name={item.src} onClick={this.handleClick}>{item.title}</a></li>)


        return (
            <ul style={navbarStyle}>
                {navList}
            </ul>
        )
    }
}


// 内容
class ContentBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories',
            repo: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.fetch()
        

    }

    async componentWillReceiveProps(newProps) {
        if (newProps.getSrc !== this.props.getSrc) {
            const { getSrc } = newProps;
            await this.setState({ url: getSrc })
            this.fetch()
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState !== this.state) {
    //         this.setState({url: this.props.getSrc})
    //         this.fetch()
    //     }
    // }


    fetch = async () => {

        const { url } = this.state
        this.setState({
            loading: true
        })

        try {
            const res = await axios.get(url)
            console.log('res', res.data)
            this.setState({
                repo: res.data.items
            })

        } catch (e) {
            console.log(e)
        }

        this.setState({
            loading: false
        })

    }

    render() {
        const { url, loading, repo } = this.state
        const number = 0
        // <li key={item.id}>{item.name}</li>
        const list = repo.map((item, key) =>
            <Box key={item.id} msg={item} index={key}/>
        )
        const contentStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            maxWidth: '1200px',
            margin: '0 auto'
        }
        return (
            <ul style={contentStyle}>
                {loading ? <p style={{ fontSize: '32px' }}>loading...</p> : list}
            </ul>
        )
    }
}

// 卡片
class Box extends React.Component {
    constructor(props) {
        super(props)
    }

    




    render() {
        const { msg, index } = this.props

        const boxStyle = {
            height: '450px',
            width: '290px',
            background: '#ebebeb',
            marginBottom: '15px'
        }
        return (
            <li style={boxStyle}>
                <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '36px' }}>#{index+1}</p>
                <div style={{ width: '150px', height: '150px', margin: '0 auto', marginTop: '30px' }}><img style={{ width: '150px', height: '150px' }} src={msg.owner.avatar_url}></img></div>
                <h3 style={{ textAlign: 'center', marginTop: '15px' }}><a style={{ color: '#bd3251' }}>{msg.name}</a></h3>
                <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
                    <li style={{ marginBottom: '5px' }}><span className='iconfont icon-name' style={{ color: '#fec077', fontSize: '12px' }}></span> {msg.name}</li>
                    <li style={{ marginBottom: '5px' }}><span className='iconfont icon-forks' style={{ color: '#ffd700', fontSize: '12px' }}></span> {msg.forks_count}</li>
                    <li style={{ marginBottom: '5px' }}><span className='iconfont icon-stars' style={{ color: '#86c5f4', fontSize: '12px' }}></span> {msg.stargazers_count}</li>
                    <li style={{ marginBottom: '5px' }}><span className='iconfont icon-issues' style={{ color: '#f09fa6', fontSize: '12px' }}></span> {msg.open_issues_count}</li>
                </ul>
            </li>
        )
    }
}




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { src: '' }
    }

    handleGetData = (val) => {
        // console.log(val)
        this.setState({ src: val })
    }

    render() {
        return (
            <div>
                <Header>
                    <Navbar getData={this.handleGetData} />
                </Header>
                <ContentBox getSrc={this.state.src}>

                </ContentBox>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)


