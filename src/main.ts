import './style.css'

// 简易Canvas黑板
class BlackBoard  {
    constructor(
        public el: HTMLCanvasElement = document.querySelector('#canvas')!,
        public text: HTMLSpanElement = document.querySelector('#text')!,
        private app = el.getContext('2d')!,
        private width: number = el.width,
        private height: number = el.height,
        private bgColor: string = '#000',
        private lineColor:string = '#fff'
    ) {
        this.initCanvas()
        this.bindEvent()
    }

    private initCanvas() {
        this.text.innerText = '画笔'
        this.app.fillStyle = this.bgColor
        this.app.fillRect(0, 0, this.width, this.height)
    }

    private bindEvent() {
        // 提取 this指向问题
        const callback = this.drawLine.bind(this)
        this.el.addEventListener('mousedown', () => {
            this.app.beginPath()
            this.app.strokeStyle = this.lineColor
            this.el.addEventListener('mousemove', callback)
        })
        document.addEventListener('mouseup', () => {
            this.el.removeEventListener('mousemove', callback)
        })
        document.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault())
    }

    private drawLine(event:MouseEvent) {
        this.app.lineTo(event.offsetX, event.offsetY)
        this.app.stroke()
    }

    public stock() {
        const btn: HTMLButtonElement = document.querySelector('#stock')!
        btn.addEventListener('click', () => {
            this.text.innerText = '画笔'
            this.lineColor = '#fff'
            this.app.lineWidth = 1
        })
        return this
    }

    public erase() {
        const btn: HTMLButtonElement = document.querySelector('#erase')!
        btn.addEventListener('click', () => {
            this.text.innerText = '橡皮擦'
            this.lineColor = this.bgColor
            this.app.lineWidth = 50
        })
        return this
    }

    public clear() {
        const btn: HTMLButtonElement = document.querySelector('#clear')!
        btn.addEventListener('click', () => {
            this.app.fillStyle = this.bgColor
            this.app.fillRect(0, 0, this.width, this.height)
        })
        return this
    }

    public save() {
        const btn:HTMLButtonElement = document.querySelector('#save')!
        btn.addEventListener('click', () => {
            const url = this.el.toDataURL('image/png')
            const a = document.createElement("a");
            const event = new MouseEvent("click");
            a.download = "canvas";
            a.href = url;
            a.dispatchEvent(event)
        })
        return this
    }
}

const instance = new BlackBoard()
instance.stock()
instance.erase()
instance.clear()
instance.save()