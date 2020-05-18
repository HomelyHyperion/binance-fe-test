import styled from 'styled-components'

export const Widget = styled.div`
  width: 290px;
  height: 380px;
  border: 1px solid #dddddd;
  padding: 10px;
  overflow: hidden;
`;

export const Heading = styled.h4`
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0;
  margin: 0;
`;

export const Options = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 12px;
    padding: 5px;
    background: none;
    color: #333333;

    &.selected {
      background: #f2f2f2;
      color: #000000;
    }
  }
  select {
    border: none;
    background: none;
    outline: none;
    color: #333333;
    cursor: pointer;

    &.selected {
      background: #f2f2f2;
      color: #000000;
    }
  }
  .star {
    color: #333333;
    font-size: 16px;
    padding: 4px 0;
    outline: none;
    cursor: pointer;

    &.selected {
      background: none;
      color: #f0b90d;
    }
  }
`;

export const Filter = styled.div`
  margin: 10px 0 15px;
  display: flex;
  justify-content: space-between;
  position: relative;

  .searchSvg {
    position: absolute;
    left: 0;
    bottom: 8px;
    opacity: 0.3;
  }

  input[type="text"] {
    width: 125px;
    margin-right: 10px;
    padding-left: 15px;
    padding-bottom: 8px;
    border: none;
    border-bottom: 1px solid #eeeeee;
    outline: none;
  }

  input[type="radio"] {
    visibility: hidden;

    + label:before {
      display: block;
      content: "";
      border: 1px solid #333333;
      border-radius: 100%;
      width: 11px;
      height: 11px;
      position: absolute;
      margin: 3px 0 0 -18px;
    }
  
    &:checked + label:after {
      display: block;
      content: "";
      background: #f0b90d;
      border-radius: 100%;
      width: 7px;
      height: 7px;
      position: absolute;
      margin: -14px 0 0 -15px;
    }
  }

  label {
    cursor: pointer;
    font-size: 12px;
    line-height: 20px;
    color: #333333;
    padding-left: 5px;
  }
`;

export const Results = styled.div`
  font-size: 12px;

  table {
    width: 100%;
    text-align: left;
  }

  thead {
    display: block;

    th {
      font-weight: normal;
      padding-bottom: 5px;
      color: #333333;
  
      &:first-child {
        width: 118px;
      }
  
      &:nth-child(2) {
        width: 100px;
      }
  
      &:last-child {
        width: 82px;
        text-align: right
      }

      span {
        cursor: pointer;
      }
    }
  }

  tbody {
    display:block;
    width: 298px;
    height: 230px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 5px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f2f2f2; 
    }
     
    ::-webkit-scrollbar-thumb {
      background: #dddddd; 
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #cccccc; 
    }

    td:first-child {
      color: #333333;
      width: 120px;
    }
  
    td:nth-child(2) {
      width: 100px;
    }

    td:last-child {
      width: 80px;
      text-align: right
    }
  }

  .caret {
    margin-right: -5px;

    &:before {
      display: inline-block;
      content: "";
      width: 0; 
      height: 0; 
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #cccccc;
      position: relative;
      top: -5px;
    }

    &:after {
      display: inline-block;
      content: "";
      width: 0; 
      height: 0; 
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #cccccc;
      position: relative;
      bottom: -1px;
      left: -8px;
    }

    &.asc:before {
      border-bottom: 4px solid #f0b90d;
    }
    
    &.desc:after {
      border-top: 4px solid #f0b90d;
    }
  }

  .star {
    background: none;
    border: none;
    padding: 0;
    color: #cccccc;
    font-size: 14px;
    cursor: pointer;
    outline: none;

    &.selected {
      color: #f0b90d;
    }
  }

  .margin {
    color: #f0b90d;
    border: 1px solid #f0b90d;
    border-radius: 3px;
    padding: 0 1px;
    font-weight: 500;
  }

  .up {
    color: #419871;
  }

  .down {
    color: #db4862;
  }
`;