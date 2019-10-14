import { notification, Icon } from 'antd';

const Infos = ({type, content}) => {
    let iconType;
    let color;
    let style;
    switch(type){
        case "success":
            iconType = "smile";
            color = "#108ee9";
            style = { color: "#2eb94c" }
            break;
        case "warning":
            iconType = "warning" ;
            color = "#cc3517";
            style = { color : "#d03c1f" }
            break;
        default :break;
    }

    const args = {
        message : type,
        description : content,
        duration: 2.5,
        icon: <Icon type={ iconType } style={{ color }} />,
        style 
    };
    notification.open(args);
};

export default  Infos ;