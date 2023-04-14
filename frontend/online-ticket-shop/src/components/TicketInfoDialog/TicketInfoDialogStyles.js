import { css } from '@emotion/css';

const styles = {
    dialogContainer: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,

    dialogHeader: css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        flex-direction: row-reverse;
    `,

    dialogContent: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px;
    `,
};

export default styles;
