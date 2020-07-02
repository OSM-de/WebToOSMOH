<?php
  $j = json_decode(file_get_contents("https://api.countapi.xyz/get/osm-de-telegram/webtoosmoh-usage"));
?>
{
  "schemaVersion": 1,
  "label": "No. of conversions",
  "message": "<?php echo $j->value; ?>",
  "color": "#3866af"
}
