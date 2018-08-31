exports.mail = function(email, subject, mailBody, buttonLink, buttonText) {
return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <title>Ogene TV</title>

  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
    }

    img {
      border: 0px;
      display: block;
    }

    .socialLinks {
      font-size: 6px;
    }

    .socialLinks a {
      display: inline-block;
    }

    .long-text p {
      margin: 1em 0px;
    }

    .long-text p:last-child {
      margin-bottom: 0px;
    }

    .long-text p:first-child {
      margin-top: 0px;
    }
  </style>
  <style type="text/css">
    /* yahoo, hotmail */
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .yshortcuts a {
      border-bottom: none !important;
    }

    .vb-outer {
      min-width: 0 !important;
    }

    .RMsgBdy,
    .ExternalClass {
      width: 100%;
      background-color: #3f3f3f;
      background-color: #3f3f3f
    }

    /* outlook/office365 add buttons outside not-linked images and safari have 2px margin */
    [o365] button {
      margin: 0 !important;
    }

    /* outlook */
    table {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }

    #outlook a {
      padding: 0;
    }

    img {
      outline: none;
      text-decoration: none;
      border: none;
      -ms-interpolation-mode: bicubic;
    }

    a img {
      border: none;
    }

    @media screen and (max-width: 600px) {

      table.vb-container,
      table.vb-row {
        width: 95% !important;
      }

      .mobile-hide {
        display: none !important;
      }

      .mobile-textcenter {
        text-align: center !important;
      }

      .mobile-full {
        width: 100% !important;
        max-width: none !important;
      }
    }

    /* previously used also screen and (max-device-width: 600px) but Yahoo Mail doesn't support multiple queries */
  </style>
  <style type="text/css">
    #ko_singleArticleBlock_4 .links-color a,
    #ko_singleArticleBlock_4 .links-color a:link,
    #ko_singleArticleBlock_4 .links-color a:visited,
    #ko_singleArticleBlock_4 .links-color a:hover {
      color: #3f3f3f;
      color: #3f3f3f;
      text-decoration: underline
    }

    #ko_socialBlock_5 .links-color a,
    #ko_socialBlock_5 .links-color a:link,
    #ko_socialBlock_5 .links-color a:visited,
    #ko_socialBlock_5 .links-color a:hover {
      color: #cccccc;
      color: #cccccc;
      text-decoration: underline
    }

    #ko_footerBlock_2 .links-color a,
    #ko_footerBlock_2 .links-color a:link,
    #ko_footerBlock_2 .links-color a:visited,
    #ko_footerBlock_2 .links-color a:hover {
      color: #cccccc;
      color: #cccccc;
      text-decoration: underline
    }
  </style>

</head>

<body bgcolor="#3f3f3f" text="#919191" alink="#cccccc" vlink="#cccccc" style="margin: 0; padding: 0; background-color: #3f3f3f; color: #919191;">
  <center>



    <table role="presentation" class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#1f497d"
      style="background-color: #1f497d;" id="ko_singleArticleBlock_4">
      <tbody>
        <tr>
          <td class="vb-outer" align="center" valign="top" style="padding-left: 9px; padding-right: 9px; font-size: 0;">
            <!--[if (gte mso 9)|(lte ie 8)]><table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]-->
            <!--
      -->
            <div style="margin: 0 auto; max-width: 570px; -mru-width: 0px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="9" bgcolor="#ffffff" width="570" class="vb-row"
                style="border-collapse: separate; width: 100%; background-color: #ffffff; mso-cellspacing: 9px; border-spacing: 9px; max-width: 570px; -mru-width: 0px;">

                <tbody>
                  <tr>
                    <td align="center" valign="top" style="font-size: 0;">
                      <div style="vertical-align: top; width: 100%; max-width: 552px; -mru-width: 0px;">
                        <!--
        -->
                        <table role="presentation" class="vb-content" border="0" cellspacing="9" cellpadding="0" style="border-collapse: separate; width: 100%; mso-cellspacing: 9px; border-spacing: 9px;"
                          width="552">

                          <tbody>
                            <tr>
                              <td width="100%" valign="top" align="center" class="links-color" style="padding-bottom: 9px;">
                                <!--[if (lte ie 8)]><div style="display: inline-block; width: 534px; -mru-width: 0px;"><![endif]--><a
                                  style="color: #3f3f3f; color: #3f3f3f; text-decoration: underline;"><img alt=""
                                    border="0" hspace="0" align="center" vspace="0" width="534" style="border: 0px; display: block; vertical-align: top; height: auto; margin: 0 auto; color: #3f3f3f; font-size: 15px; font-family: Arial, Helvetica, sans-serif; width: 100%; max-width: 534px; height: auto;"
                                    src="https://res.cloudinary.com/ogenetv/image/upload/v1535629424/latest_oghene_tvojijioj-01.png"></a>
                                <!--[if (lte ie 8)]></div><![endif]-->
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" valign="top" align="left" style="font-weight: normal; color: #3f3f3f; font-size: 18px; font-family: Arial Black, Arial Black, Gadget, sans-serif; text-align: left;"><span
                                  style="font-weight: normal;"><strong>${subject}</strong></span></td>
                            </tr>
                            <tr>
                              <td class="long-text links-color" width="100%" valign="top" align="left" style="font-weight: normal; color: #3f3f3f; font-size: 15px; font-family: Arial, Helvetica, sans-serif; text-align: left; line-height: 150%;">
                                <p style="margin: 1em 0px; margin-bottom: 0px; margin-top: 0px; text-align: center;">${mailBody}</p>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top" align="center">
                                <table role="presentation" cellpadding="6" border="0" align="center" cellspacing="0"
                                  style="border-spacing: 0; mso-padding-alt: 6px 6px 6px 6px; padding-top: 4px;">
                                  <tbody>
                                    <tr>
                                      <td width="auto" valign="middle" align="center" bgcolor="#17365d" style="text-align: center; font-weight: normal; padding: 6px; padding-left: 18px; padding-right: 18px; background-color: #17365d; color: #f2f2f2; font-size: 14px; font-family: Arial, Helvetica, sans-serif; border-radius: 4px;"><a
                                          style="text-decoration: none; font-weight: normal; color: #f2f2f2; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"
                                          target="_new" href=${buttonLink}><strong>${buttonText}</strong></a></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <!--
    -->
            <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <table role="presentation" class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#3f3f3f"
      style="background-color: #3f3f3f;" id="ko_socialBlock_5">
      <tbody>
        <tr>
          <td class="vb-outer" align="center" valign="top" style="padding-left: 9px; padding-right: 9px; font-size: 0;">
            <!--[if (gte mso 9)|(lte ie 8)]><table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]-->
            <!--
      -->
            <div style="margin: 0 auto; max-width: 570px; -mru-width: 0px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="9" style="border-collapse: separate; width: 100%; mso-cellspacing: 9px; border-spacing: 9px; max-width: 570px; -mru-width: 0px;"
                width="570" class="vb-row">

                <tbody>
                  <tr>
                    <td align="center" valign="top" style="font-size: 0;">
                      <div style="width: 100%; max-width: 552px; -mru-width: 0px;">
                        <!--[if (gte mso 9)|(lte ie 8)]><table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="552"><tr><![endif]-->
                        <!--
        -->
                        <!--
          -->
                        <!--[if (gte mso 9)|(lte ie 8)]><td align="left" valign="top" width="276"><![endif]-->
                        <!--
      -->
                        <div class="mobile-full" style="display: inline-block; vertical-align: top; width: 100%; max-width: 276px; -mru-width: 0px; min-width: calc(50%); max-width: calc(100%); width: calc(304704px - 55200%);">
                          <!--
        -->
                          <table role="presentation" class="vb-content" border="0" cellspacing="9" cellpadding="0"
                            style="border-collapse: separate; width: 100%; mso-cellspacing: 9px; border-spacing: 9px; -yandex-p: calc(2px - 3%);"
                            width="276" align="left">

                            <tbody>
                              <tr>
                                <td class="long-text links-color" width="100%" valign="top" align="left" style="font-weight: normal; color: #919191; font-size: 13px; font-family: Arial Black, Arial Black, Gadget, sans-serif; text-align: left;">
                                  <h4>Address:&nbsp;Enugu Lifestyle and Golf City</h4>
                                  <h4>Phone: 0907744533</h4>
                                  <h4>Email: contact@ogenetv.com</h4>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                          <!--
      -->
                        </div>
                        <!--[if (gte mso 9)|(lte ie 8)]></td><![endif]-->
                        <!--
          -->
                        <!--[if (gte mso 9)|(lte ie 8)]><td align="left" valign="top" width="276"><![endif]-->
                        <!--
      -->
                        <div class="mobile-full" style="display: inline-block; vertical-align: top; width: 100%; max-width: 276px; -mru-width: 0px; min-width: calc(50%); max-width: calc(100%); width: calc(304704px - 55200%);">
                          <!--
        -->
                          <table role="presentation" class="vb-content" border="0" cellspacing="9" cellpadding="0"
                            style="border-collapse: separate; width: 100%; mso-cellspacing: 9px; border-spacing: 9px; -yandex-p: calc(2px - 3%);"
                            width="276" align="left">

                            <tbody>
                              <tr>
                                <td width="100%" valign="top" style="font-size: 6px; font-weight: normal; text-align: right;"
                                  align="right" class="links-color socialLinks mobile-textcenter">

                                  &nbsp;<a target="_new" href="" style="display: inline-block; color: #cccccc; color: #cccccc; text-decoration: underline;"><img
                                      border="0" style="border: 0px; display: inline-block; vertical-align: top; padding-bottom: 0px; background: url(https://), #3b5998; border-radius: 50px;"
                                      src="https://mosaico.io/templates/versafix-1/img/icons/fb-colors-96.png" width="32"
                                      height="32" alt="Facebook"></a>

                                  &nbsp;<a target="_new" href="" style="display: inline-block; color: #cccccc; color: #cccccc; text-decoration: underline;"><img
                                      border="0" style="border: 0px; display: inline-block; vertical-align: top; padding-bottom: 0px; background: url(https://), #4099FF; border-radius: 50px;"
                                      src="https://mosaico.io/templates/versafix-1/img/icons/tw-colors-96.png" width="32"
                                      height="32" alt="Twitter"></a>

                                  &nbsp;<a target="_new" href="" style="display: inline-block; color: #cccccc; color: #cccccc; text-decoration: underline;"><img
                                      border="0" style="border: 0px; display: inline-block; vertical-align: top; padding-bottom: 0px; background: url(https://), #d34836; border-radius: 50px;"
                                      src="https://mosaico.io/templates/versafix-1/img/icons/gg-colors-96.png" width="32"
                                      height="32" alt="Google"></a>
                                </td>
                              </tr>


                            </tbody>
                          </table>
                          <!--
      -->
                        </div>
                        <!--[if (gte mso 9)|(lte ie 8)]></td><![endif]-->
                        <!--
        -->
                        <!--
      -->
                        <!--[if (gte mso 9)|(lte ie 8)]></tr></table><![endif]-->
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <!--
    -->
            <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>


    <!-- footerBlock -->
    <table role="presentation" class="vb-outer" width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#3f3f3f"
      style="background-color: #3f3f3f;" id="ko_footerBlock_2">
      <tbody>
        <tr>
          <td class="vb-outer" align="center" valign="top" style="padding-left: 9px; padding-right: 9px; font-size: 0;">
            <!--[if (gte mso 9)|(lte ie 8)]><table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="570"><tr><td align="center" valign="top"><![endif]-->
            <!--
      -->
            <div style="margin: 0 auto; max-width: 570px; -mru-width: 0px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; width: 100%; mso-cellspacing: 0px; border-spacing: 0px; max-width: 570px; -mru-width: 0px;"
                width="570" class="vb-row">

                <tbody>
                  <tr>
                    <td align="center" valign="top" style="font-size: 0; padding: 0 9px;">
                      <div style="vertical-align: top; width: 100%; max-width: 552px; -mru-width: 0px;">
                        <!--
        -->
                        <table role="presentation" class="vb-content" border="0" cellspacing="9" cellpadding="0" style="border-collapse: separate; width: 100%; mso-cellspacing: 9px; border-spacing: 9px;"
                          width="552">

                          <tbody>
                            <tr>
                              <td class="long-text links-color" width="100%" valign="top" align="center" style="font-weight: normal; color: #919191; font-size: 13px; font-family: Arial Black, Arial Black, Gadget, sans-serif; text-align: center;">
                                <p style="margin: 1em 0px; margin-bottom: 0px; margin-top: 0px;">Email sent to <a href="mailto:[mail]"
                                    style="color: #cccccc; color: #cccccc; text-decoration: underline;">${email}</a></p>
                              </td>
                            </tr>
                            <tr>
                                <td class="long-text links-color" width="100%" valign="top" align="center" style="font-weight: normal; color: #919191; font-size: 13px; font-family: Arial Black, Arial Black, Gadget, sans-serif; text-align: center;">
                                    <p style="margin: 1em 0px; margin-bottom: 0px; margin-top: 0px;">Email sent to <a href="mailto:"
                                        style="color: #cccccc; color: #cccccc; text-decoration: underline;">${email}</a> because you registered at ogenetv.com. You can ignore this mail if this is not you.</p>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <!--
    -->
            <!--[if (gte mso 9)|(lte ie 8)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- /footerBlock -->

  </center>
</body>

</html>`

}  
