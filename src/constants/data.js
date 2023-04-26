import images from "./images"
import imgpending from "../assets/images/pending.png"
import imgprocess from "../assets/images/process.png"
import imgclose from "../assets/images/close.png"

const data = {
    user: {
        name: 'pirman ganteng 123',
        img: images.avt
    },
    summary: [
        {
            title: 'Pending Order',
            subtitle: 'Total Pending Order',
            value: '18',
            img: <img src={imgpending} alt="close"/>
        },
        {
            title: 'Process Order',
            subtitle: 'Total Process Order',
            value: '30',
            img: <img src={imgprocess} alt="close"/>
        },
        {
            title: 'Close Order',
            subtitle: 'Total Close Order',
            value: '50',
            img: <img src={imgclose} alt="close"/>
        },
    ],
    revenueByMonths: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export default data