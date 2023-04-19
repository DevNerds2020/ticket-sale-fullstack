import { css } from '@emotion/css';

const styles = {
    dialogContainer: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
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
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        overflow: hidden;
    `,

    dialogItem: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        margin: 0.4rem;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
        }
    `,

    dialogItemKey: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 50%;
        height: 100%;
        font-size: 14px;
        font-weight: 500;
    `,
    dialogItemValue: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 50%;
        height: 100%;
        font-size: 14px;
        font-weight: 500;
    `,

    tailwind: {
        dialogContainer: 'flex flex-col items-center justify-center',
        dialogHeader:
            'flex items-center w-full h-12 bg-gray-100 border-b border-gray-200',
        dialogContent:
            'mt-2 flex flex-col items-center justify-center w-full h-full p-4 overflow-hidden',
        dialogItem:
            'flex flex-row items-center justify-between w-full h-12 p-2 border-b border-gray-200 m-1 cursor-pointer hover:scale-105',
        dialogItemKey:
            'flex flex-row items-center justify-start w-1/2 h-full text-sm font-medium',
        dialogItemValue:
            'flex flex-row items-center justify-start w-1/2 h-full text-sm font-medium',
    },
};

export default styles;
