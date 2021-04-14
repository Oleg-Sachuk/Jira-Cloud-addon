import SectionMessage from '@atlaskit/section-message';
import regeneratorRuntime from "regenerator-runtime"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHttp } from '../hooks/UseHttp';
import { Form, Field } from 'react-final-form'
import headers from '../configauth';

function HelloWorld() {
  const [excitementLevel, setExcitementLevel] = React.useState(0);
  const { request } = useHttp();
  let [tabs, setTabs] = useState()
  const baseUrl = useRef();

  const getUserInfo = useCallback(async () => {
    try {
      baseUrl.current = window.location.href.split(window.location.pathname)[0];

      setTabs(await request(`${baseUrl.current}/getissue`, 'GET', null, headers))
    } catch (error) {
      console.log(error);
    }
  }, [])

  const onFilterChange = async (filter) => {
    let dataurl = await request(`${baseUrl.current}/getfilter`, 'POST', { filter }, headers)
    setTabs(await request(`${baseUrl.current}/getdata`, 'POST', { url: dataurl.searchUrl }, headers))
  }

  const onNameChange = async (name) => {
    url = `https://oleg-test.atlassian.net/rest/api/2/search?jql=assignee="${name}"`
    let issues = await request(`${baseUrl.current}/getdata`, 'POST', { url }, {
      "Authorization": `Basic ${Buffer.from(
        'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
      ).toString('base64')}`
    })
    if (!issues.errorMessages) setTabs(issues);
  }

  const handleSubmit = (event) => {
    switch (event.target.value) {
      case 'default':
        getUserInfo()
        break;
      case '/10000':
        onFilterChange(event.target.value)
        break;
      default:
        onNameChange(event.target.value)
        break;
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (<>
    <div className='intro-header'><h1>Everything started fine!</h1></div>
    {tabs && <h2>Made by Oleg Sachuk</h2>}
        <form onSubmit={handleSubmit} onChange={handleSubmit}>
          <div scope='row'>
            <select name={'type'}>
              <option placeholder='default' >{'default'}</option>
              <option placeholder='by id' >{'/10000'}</option>
              {tabs && tabs.issues.map(element => {
                if (element.fields.assignee) return <option placeholder='by name' >{`${element.fields.assignee.displayName}`}</option>
              })}
            </select>
            <label htmlFor="type">choose filter</label>
          </div >
        </form>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Assignee</th>
          <th scope="col">BACKLOG</th>
          <th scope="col">SELECTED FOR DEVELOPMENT</th>
          <th scope="col">IN PROGRESS</th>
          <th scope="col">DONE</th>
        </tr>
      </thead>
      <tbody>
        {tabs && tabs.issues.map(issue => <tr>
          <th scope="row">{tabs.issues.indexOf(issue) + 1}</th>
          <td>{issue.fields.assignee
            ? issue.fields.assignee.displayName
            : 'Unassigned'}</td>
          <td>
            <a href={`https://oleg-test.atlassian.net/browse/${issue.key}?filter=10000`}>
              {issue.fields.status.name === 'Backlog' ? '1' : '0'}
            </a></td>
          <td>
            <a href={`https://oleg-test.atlassian.net/browse/${issue.key}?filter=10000`}>
              {issue.fields.status.name === 'Selected for Development' ? '1' : '0'}
            </a></td>
          <td>
            <a href={`https://oleg-test.atlassian.net/browse/${issue.key}?filter=10000`}>
              {issue.fields.status.name === 'In Progress' ? '1' : '0'}
            </a></td>
          <td>
            <a href={`https://oleg-test.atlassian.net/browse/${issue.key}?filter=10000`}>
              {issue.fields.status.name === 'Done' ? '1' : '0'}
            </a></td>
        </tr>)}
      </tbody>
    </table>
    <SectionMessage
      title={`Hello, world${excitementLevel ? new Array(excitementLevel).fill('!').join('') : '.'}`}
      actions={[
        {
          key: '2',
          onClick: () => setExcitementLevel(excitementLevel + 1),
          text: 'Get excited!',
        }
      ]}
    >
      <p>
        Congratulations! You are successfully using an Atlassian Connect app, made for demonstration for SaaSJet test task.
      </p>
    </SectionMessage>
  </>);
}

export default HelloWorld;
