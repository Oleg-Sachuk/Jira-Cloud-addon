import SectionMessage from '@atlaskit/section-message';
import regeneratorRuntime from "regenerator-runtime"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHttp } from '../hooks/UseHttp';
import { Form, Field} from 'react-final-form'

function HelloWorld() {
  const [excitementLevel, setExcitementLevel] = React.useState(0);
  const { request } = useHttp();
  let [tabs, setTabs] = useState()
  const baseUrl = useRef();

  const getUserInfo = useCallback(async () => {
    try {

      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${Buffer.from(
        'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
      ).toString('base64')}`);

      baseUrl.current = window.location.href.split(window.location.pathname)[0];

      setTabs(await request(`${baseUrl.current}/getissue`, 'GET', null, myHeaders))
    } catch (error) {
      console.log(error);
    }
  }, [])

  const onFilterChange = async (filter) => {
    let dataurl = await request(`${baseUrl.current}/getfilter`, 'POST', {filter}, {"Authorization": `Basic ${Buffer.from(
      'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
    ).toString('base64')}`})
    setTabs(await request(`${baseUrl.current}/getdata`, 'POST', {url: dataurl.searchUrl}, {"Authorization": `Basic ${Buffer.from(
      'sachuk.o.a@gmail.com:X8BvJRasXAzVtvDOA3b92690'
    ).toString('base64')}`}))

    console.log("URL",dataurl.searchUrl)
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (<>
    <div><h1>Everything started fine!</h1></div>
    <Form
            onSubmit={formData => {
              onFilterChange(formData.type);
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} onChange={handleSubmit}>
                    <div scope='row'>
                        <div scope='col'>
                            <Field name={'type'} component={'select'} >
                              <option placeholder='default' >{'/search'}</option>
                              <option placeholder='by status' >{'/my'}</option>
                              <option placeholder='by id' >{'/10000'}</option>
                            </Field>
                        </div>
                    </div >
                </form>
            )}
        </Form>
    {tabs && <h2>{tabs.issues[2].fields.assignee.displayName}</h2>}
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
              <td>{issue.fields.status.name === 'Backlog' ? '1' : '0'}</td>
              <td>{issue.fields.status.name === 'Selected for Development' ? '1' : '0'}</td>
              <td>{issue.fields.status.name === 'In Progress' ? '1' : '0'}</td>
              <td>{issue.fields.status.name === 'Done' ? '1' : '0'}</td>
            </tr>)}
      </tbody>
    </table>
      <SectionMessage
        title={`Hello, world${excitementLevel ? new Array(excitementLevel).fill('!').join('') : '.'}`}
        actions={[
          {
            key: '1',
            href: 'https://atlassian.design/components/',
            text: 'Browse more components to add to your app',
          },
          {
            key: '2',
            onClick: () => setExcitementLevel(excitementLevel + 1),
            text: 'Get excited!',
          }
        ]}
      >
        <p>
          Congratulations! You have successfully created an Atlassian Connect app using the <a href={'https://bitbucket.org/atlassian/atlassian-connect-express'}>atlassian-connect-express</a> client library.
      </p>
      </SectionMessage>
  </>);
}

export default HelloWorld;
